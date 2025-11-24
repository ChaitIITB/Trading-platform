// API configuration
export const apiConfig = {
  dexScreener: {
    baseUrl: 'https://api.dexscreener.com/latest/dex',
    timeout: 5000,
    maxRetries: 5,
  },
  jupiter: {
    baseUrl: 'https://lite-api.jup.ag',
    timeout: 5000,
    maxRetries: 5,
  },
  geckoTerminal: {
    baseUrl: 'https://api.geckoterminal.com/api/v2',
    timeout: 5000,
    maxRetries: 5,
    apiKey: process.env.GECKO_TERMINAL_API_KEY,
  },
};
