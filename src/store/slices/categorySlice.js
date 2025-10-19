import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '../../utils/api';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: null,
  details: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await categoriesApi.getCategories();
  return response;
});

export const fetchCategoriesByParent = createAsyncThunk('categories/fetchCategoriesByParent', async (parentId = null) => {
  const categories = await categoriesApi.getCategoriesByParent(parentId);
  return categories;
});

export const fetchCategoryWithSubById = createAsyncThunk('categories/fetchCategoryWithSubById', async (id) => {
  const response = await categoriesApi.getCategoryWithSubById(id);
  return response;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCategories: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.categories || action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch categories';
      })
      .addCase(fetchCategoriesByParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesByParent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCategoriesByParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch categories by parent';
      })
      .addCase(fetchCategoryWithSubById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryWithSubById.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload || null;
      })
      .addCase(fetchCategoryWithSubById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch category details';
      });
  },
});

export const { setSelectedCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;