// Application setup
import express from 'express';
import { errorHandler } from './api/middlewares/errorHandler';
import { rateLimiter } from './api/middlewares/rateLimiter';
import { tokenRoutes } from './api/routes/token.routes';

export function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(rateLimiter);

  // Routes
  app.use('/api', tokenRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
}
