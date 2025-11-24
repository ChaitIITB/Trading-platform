// Validator middleware
import { Request, Response, NextFunction } from 'express';

export function validateTokenQuery(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Validation logic
  next();
}
