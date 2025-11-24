// DEX repository interface
import { IToken } from '../../domain/interfaces/IToken';

export interface IDexRepository {
  fetchTokenByAddress(address: string): Promise<IToken[]>;
  searchTokens(query: string): Promise<IToken[]>;
}
