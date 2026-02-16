export const REGEX_PATTERNS = {
  // Email validation
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone validation (Egyptian format)
  PHONE_EGYPT: /^(\+20|0)?1[0-2]\d{8}$/,
  PHONE_INTERNATIONAL: /^\+?[1-9]\d{1,14}$/,

  // Password validation
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: /[A-Z]/,
    REQUIRE_LOWERCASE: /[a-z]/,
    REQUIRE_NUMBER: /\d/,
    REQUIRE_SPECIAL: /[!@#$%^&*(),.?":{}|<>]/
  },

  // Name validation
  NAME: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
  BUSINESS_NAME: /^[a-zA-Z0-9\u0600-\u06FF\s&\-.,]{2,100}$/,

  // Address validation
  STREET_ADDRESS: /^[a-zA-Z0-9\u0600-\u06FF\s\-.,#]{5,100}$/,
  CITY: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
  POSTAL_CODE: /^[a-zA-Z0-9\s\-]{3,20}$/,

  // Business validation
  TAX_ID: /^[a-zA-Z0-9\-]{10,20}$/,
  BUSINESS_LICENSE: /^[a-zA-Z0-9\-]{10,30}$/,

  // Product validation
  SKU: /^[A-Z0-9\-]{5,20}$/,
  BARCODE: /^[0-9]{8,14}$/,

  // URL validation
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  WEBSITE: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,

  // Numeric validation
  POSITIVE_NUMBER: /^\d*\.?\d+$/,
  INTEGER: /^\d+$/,
  DECIMAL: /^\d+\.\d{1,2}$/,

  // Currency validation
  CURRENCY_EGP: /^\d{1,8}(\.\d{1,2})?$/,
  CURRENCY_USD: /^\d{1,6}(\.\d{1,2})?$/,

  // Date validation
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,

  // File validation
  IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  DOCUMENT_EXTENSION: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i,

  // Social media validation
  FACEBOOK_URL: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,50}$/,
  INSTAGRAM_URL: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{5,30}$/,
  LINKEDIN_URL: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]{5,50}$/,
} as const;
