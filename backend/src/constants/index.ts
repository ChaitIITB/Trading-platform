// App-wide constants
export const CACHE_KEYS = {
  TOKEN_BY_ADDRESS: (address: string) => `token:address:${address}`,
  TOKEN_SEARCH: (query: string) => `token:search:${query}`,
};

export const API_ENDPOINTS = {
  DEXSCREENER: {
    TOKEN: (address: string) => `/tokens/${address}`,
    SEARCH: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  },
  JUPITER: {
    SEARCH: (query: string) => `/tokens/v2/search?query=${encodeURIComponent(query)}`,
  },
};

export const RATE_LIMITS = {
  DEXSCREENER: 300, // requests per minute
  JUPITER: 600,
  GECKO_TERMINAL: 30,
};

export const DEFAULT_TTL = 30000; // 30 seconds
