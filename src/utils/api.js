const API_BASE_URL = 'https://api.ivitasa.com';

// Generic API fetch function (plain JS)
async function apiRequest(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Brands API
export const brandsApi = {
  getBrands: async (limit = 10, offset = 0) => {
    return apiRequest(`/brands/get?limit=${limit}&offset=${offset}`);
  },
  getAllBrands: async () => {
    return apiRequest('/brands/get?limit=1000&offset=0');
  },
};

// Categories API
export const categoriesApi = {
  getCategories: async () => {
    return apiRequest('/categories');
  },
  getCategoriesByParent: async (parentId = null) => {
    const response = await categoriesApi.getCategories();
    return (response?.categories || []).filter((cat) => cat.parent_id === parentId);
  },
  getMainCategories: async () => {
    return categoriesApi.getCategoriesByParent(null);
  },
  getSubCategories: async (parentId) => {
    return categoriesApi.getCategoriesByParent(parentId);
  },
  getCategoryWithSubById: async (id) => {
    return apiRequest(`/categories/id/${id}`);
  },
};

// Generic helper to get localized content in an array of objects
export const getLocalizedContent = (langs, lang = 'ar') => {
  if (!Array.isArray(langs)) return null;
  return langs.find((l) => l.lang === lang) || null;
};

// Helper functions to get localized fields
export const getLocalizedBrandName = (brand, lang = 'ar') => {
  const meta = Array.isArray(brand?.meta) ? brand.meta.find((m) => m.lang === lang) : null;
  return meta?.name || brand?.slug || '';
};

export const getLocalizedCategoryName = (category, lang = 'ar') => {
  const langData = Array.isArray(category?.Langs) ? category.Langs.find((l) => l.lang === lang) : null;
  return langData?.name || category?.slug || '';
};

export const getLocalizedCategoryImage = (category, lang = 'ar') => {
  const langData = Array.isArray(category?.Langs) ? category.Langs.find((l) => l.lang === lang) : null;
  return langData?.img || null;
};

// Products API
export const productsApi = {
  // Get products by category ID with query params
  getByCategory: async (
    categoryId,
    {
      limit = 50,
      offset = 0,
      brand_id,
      price_from = 0,
      price_to,
      sort_option = 1,
      in_stock,
      in_sale,
      is_local,
    } = {}
  ) => {
    const params = new URLSearchParams();
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    if (brand_id != null) params.set('brand_id', String(brand_id));
    if (price_from != null) params.set('price_from', String(price_from));
    if (price_to != null) params.set('price_to', String(price_to));
    if (sort_option != null) params.set('sort_option', String(sort_option));
    if (in_stock != null) params.set('in_stock', String(in_stock));
    if (in_sale != null) params.set('in_sale', String(in_sale));
    if (is_local != null) params.set('is_local', String(is_local));
    return apiRequest(`/products/getbycat/${categoryId}?${params.toString()}`);
  },

  // Search products by name
  searchByName: async (name, limit = 50, offset = 0) => {
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    return apiRequest(`/products/getbyname?${params.toString()}`);
  },
};