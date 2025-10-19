import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dummyProducts } from '../../data/dummyData';
import { productsApi } from '../../utils/api';

const initialState = {
  products: dummyProducts,
  featuredProducts: dummyProducts.slice(0, 4),
  saleProducts: dummyProducts.filter(product => product.isSale),
  newProducts: dummyProducts.filter(product => product.isNew),
  loading: false,
  error: null,
  selectedCategory: null,
  total: 0,
  limit: 50,
  offset: 0,
};

// Async thunks
export const fetchProductsByCategoryId = createAsyncThunk(
  'products/fetchByCategoryId',
  async ({ categoryId, params } = {}) => {
    const response = await productsApi.getByCategory(categoryId, params);
    return response;
  }
);

export const searchProductsByName = createAsyncThunk(
  'products/searchByName',
  async ({ name, limit = 50, offset = 0 } = {}) => {
    const response = await productsApi.searchByName(name, limit, offset);
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.products = dummyProducts.filter(product => product.category === action.payload);
      } else {
        state.products = dummyProducts;
      }
    },
    filterProductsByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.products = dummyProducts.filter(product => product.category === action.payload);
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.products = dummyProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.total = action.payload.total ?? state.total;
        state.limit = action.payload.limit ?? state.limit;
        state.offset = action.payload.offset ?? state.offset;
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch products by category';
      })
      .addCase(searchProductsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.total = action.payload.total ?? state.total;
        state.limit = action.payload.limit ?? state.limit;
        state.offset = action.payload.offset ?? state.offset;
      })
      .addCase(searchProductsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to search products';
      });
  }
});

export const { setProducts, setFeaturedProducts, setLoading, setError, setSelectedCategory, filterProductsByCategory, clearFilters } = productSlice.actions;

export default productSlice.reducer;