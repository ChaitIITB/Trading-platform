// Base DEX provider
import { IToken } from '../../domain/interfaces/IToken';

export abstract class BaseDexProvider {
  protected baseUrl: string;
  protected timeout: number;
  protected maxRetries: number;

  constructor(baseUrl: string, timeout: number = 5000, maxRetries: number = 5) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.maxRetries = maxRetries;
  }

  abstract fetchTokenByAddress(address: string): Promise<IToken[]>;
  abstract searchTokens(query: string): Promise<IToken[]>;
  abstract getName(): string;
}
