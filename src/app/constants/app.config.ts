const _env = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;

export const APP_CONFIG = {
  // App info
  APP_NAME: 'بالجملة',
  APP_NAME_EN: 'Gomla',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'منصة متكاملة لرقمنة قطاع التجارة بالجملة (B2B)',

  // API configuration
  API: {
    BASE_URL: _env['NX_API_BASE_URL'] || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
  },

  // Authentication
  AUTH: {
    TOKEN_KEY: 'gomla_token',
    REFRESH_TOKEN_KEY: 'gomla_refresh_token',
    USER_KEY: 'gomla_user',
    TOKEN_EXPIRY_BUFFER: 300, // 5 minutes before expiry
    SESSION_TIMEOUT: 3600000, // 1 hour
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
  },

  // File upload
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    IMAGE_QUALITY: 0.8,
    THUMBNAIL_SIZE: 300
  },

  // Cache configuration
  CACHE: {
    DEFAULT_TTL: 300000, // 5 minutes
    USER_CACHE_TTL: 600000, // 10 minutes
    PRODUCT_CACHE_TTL: 1800000, // 30 minutes
    CATEGORY_CACHE_TTL: 3600000 // 1 hour
  },

  // Search configuration
  SEARCH: {
    DEBOUNCE_TIME: 300,
    MIN_SEARCH_LENGTH: 2,
    MAX_SEARCH_RESULTS: 50
  },

  // Currency and locale
  CURRENCY: {
    DEFAULT: 'EGP',
    SUPPORTED: ['EGP', 'USD', 'EUR', 'SAR'],
    SYMBOLS: {
      EGP: 'ج.م',
      USD: '$',
      EUR: '€',
      SAR: 'ر.س'
    }
  },

  LOCALE: {
    DEFAULT: 'ar',
    SUPPORTED: ['ar', 'en'],
    DIRECTIONS: {
      ar: 'rtl',
      en: 'ltr'
    }
  },

  // Business rules
  BUSINESS: {
    MIN_ORDER_VALUE: 1000, // EGP
    MAX_ORDER_ITEMS: 100,
    ORDER_CANCELATION_HOURS: 2,
    RETURN_PERIOD_DAYS: 14,
    INVENTORY_LOW_STOCK_THRESHOLD: 10,
    SUPPLIER_VERIFICATION_REQUIRED: true
  },

  // UI configuration
  UI: {
    SIDEBAR_COLLAPSED_WIDTH: 80,
    SIDEBAR_EXPANDED_WIDTH: 280,
    HEADER_HEIGHT: 64,
    FOOTER_HEIGHT: 48,
    CONTENT_MAX_WIDTH: 1400,
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    DESKTOP_BREAKPOINT: 1280
  },

  // Analytics
  ANALYTICS: {
    GOOGLE_ANALYTICS_ID: _env['NX_GA_ID'] || '',
    ENABLE_TRACKING: _env['NODE_ENV'] === 'production'
  },

  // Features flags
  FEATURES: {
    ENABLE_MULTI_CURRENCY: false,
    ENABLE_MULTI_LANGUAGE: true,
    ENABLE_DARK_MODE: false,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_CHAT: false,
    ENABLE_ANALYTICS: true
  },

  // External services
  EXTERNAL: {
    MAPS_API_KEY: _env['NX_MAPS_API_KEY'] || '',
    PAYMENT_GATEWAY: {
      PROVIDER: 'stripe', // or 'paypal', 'paymob'
      PUBLIC_KEY: _env['NX_PAYMENT_PUBLIC_KEY'] || '',
      WEBHOOK_SECRET: _env['NX_PAYMENT_WEBHOOK_SECRET'] || ''
    },
    EMAIL: {
      PROVIDER: 'sendgrid', // or 'aws-ses', 'mailgun'
      FROM_EMAIL: 'noreply@gomla.com',
      FROM_NAME: 'بالجملة'
    },
    SMS: {
      PROVIDER: 'twilio', // or 'aws-sns', 'messagebird'
      FROM_NUMBER: _env['NX_SMS_FROM_NUMBER'] || ''
    }
  },

  // Development
  DEVELOPMENT: {
    ENABLE_MOCK_DATA: _env['NODE_ENV'] === 'development',
    LOG_LEVEL: _env['NX_LOG_LEVEL'] || 'info',
    ENABLE_DEBUG_MODE: _env['NODE_ENV'] === 'development'
  }
} as const;
