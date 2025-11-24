// Server entry point
import { createApp } from './app';
import { validateEnv } from './config/env.validator';

async function main() {
  // Validate environment
  validateEnv();

  // Create app
  const app = createApp();

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
