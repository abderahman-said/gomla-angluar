export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    CHANGE_PASSWORD: '/auth/change-password',
    UPDATE_PROFILE: '/auth/profile'
  },

  // Users endpoints
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
    SEARCH: '/users/search'
  },

  // Products endpoints
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
    SUBCATEGORIES: '/products/subcategories',
    BRANDS: '/products/brands',
    FEATURED: '/products/featured',
    RELATED: (id: string) => `/products/${id}/related`,
    REVIEWS: (id: string) => `/products/${id}/reviews`,
    INVENTORY: (id: string) => `/products/${id}/inventory`
  },

  // Orders endpoints
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    TRACK: (id: string) => `/orders/${id}/track`,
    INVOICE: (id: string) => `/orders/${id}/invoice`,
    STATISTICS: '/orders/statistics'
  },

  // Categories endpoints
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
    TREE: '/categories/tree'
  },

  // Suppliers endpoints
  SUPPLIERS: {
    LIST: '/suppliers',
    DETAIL: (id: string) => `/suppliers/${id}`,
    CREATE: '/suppliers',
    UPDATE: (id: string) => `/suppliers/${id}`,
    DELETE: (id: string) => `/suppliers/${id}`,
    VERIFY: (id: string) => `/suppliers/${id}/verify`,
    PRODUCTS: (id: string) => `/suppliers/${id}/products`
  },

  // Dashboard endpoints
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    ANALYTICS: '/dashboard/analytics',
    SALES: '/dashboard/sales',
    INVENTORY: '/dashboard/inventory',
    CUSTOMERS: '/dashboard/customers'
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    BULK: '/upload/bulk'
  },

  // Search endpoints
  SEARCH: {
    PRODUCTS: '/search/products',
    SUPPLIERS: '/search/suppliers',
    ORDERS: '/search/orders',
    GLOBAL: '/search'
  }
} as const;
