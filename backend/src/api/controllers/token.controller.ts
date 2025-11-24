// Token controller
import { Request, Response } from 'express';

export class TokenController {
  async getTokens(req: Request, res: Response): Promise<void> {
    res.json({ tokens: [] });
  }

  async getTokenByAddress(req: Request, res: Response): Promise<void> {
    const { address } = req.params;
    res.json({ token: null, address });
  }

  async searchTokens(req: Request, res: Response): Promise<void> {
    const { q } = req.query;
    res.json({ tokens: [], query: q });
  }
}
