// Validate environment variables at startup
export function validateEnv(): void {
  const required: string[] = [];
  const optional = [
    'REDIS_HOST',
    'REDIS_PORT',
    'REDIS_PASSWORD',
    'CACHE_TTL',
    'GECKO_TERMINAL_API_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('✓ Environment variables validated');
}
