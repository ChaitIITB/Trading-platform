// Token routes
import { Router } from 'express';

const router = Router();

router.get('/tokens', async (req, res) => {
  res.json({ tokens: [] });
});

router.get('/tokens/:address', async (req, res) => {
  res.json({ token: null });
});

export { router as tokenRoutes };
