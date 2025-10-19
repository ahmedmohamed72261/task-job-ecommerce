import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { brandsApi } from '../../utils/api';

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0,
};

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async ({ limit = 10, offset = 0 } = {}) => {
  const response = await brandsApi.getBrands(limit, offset);
  return response;
});

export const fetchAllBrands = createAsyncThunk('brands/fetchAllBrands', async () => {
  const response = await brandsApi.getAllBrands();
  return response;
});

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrands: (state) => {
      state.items = [];
      state.total = 0;
      state.offset = 0;
    },
    setBrandsPagination: (state, action) => {
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.brands || [];
        state.total = action.payload.total ?? 0;
        state.limit = action.payload.limit ?? state.limit;
        state.offset = action.payload.offset ?? state.offset;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch brands';
      })
      .addCase(fetchAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.brands || [];
        state.total = action.payload.total ?? 0;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch all brands';
      });
  },
});

export const { clearBrands, setBrandsPagination } = brandSlice.actions;
export default brandSlice.reducer;