// Jupiter service
import { BaseDexProvider } from './BaseDexProvider';
import { IToken } from '../../domain/interfaces/IToken';

export class JupiterService extends BaseDexProvider {
  getName(): string {
    return 'Jupiter';
  }

  async fetchTokenByAddress(address: string): Promise<IToken[]> {
    // Implementation with retry logic
    throw new Error('Method not implemented');
  }

  async searchTokens(query: string): Promise<IToken[]> {
    // Implementation with retry logic
    throw new Error('Method not implemented');
  }
}
