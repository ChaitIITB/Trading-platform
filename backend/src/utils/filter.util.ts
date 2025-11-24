// Filter utility
import { IToken } from '../domain/interfaces/IToken';
import { TokenFilterDto } from '../dto/TokenFilterDto';

export function filterTokens(tokens: IToken[], filters: TokenFilterDto): IToken[] {
  return tokens.filter((token) => {
    if (filters.chain && token.chain !== filters.chain) return false;
    
    if (filters.minLiquidity && (token.liquidity || 0) < filters.minLiquidity) return false;
    if (filters.maxLiquidity && (token.liquidity || 0) > filters.maxLiquidity) return false;
    
    if (filters.minPrice && (token.price || 0) < filters.minPrice) return false;
    if (filters.maxPrice && (token.price || 0) > filters.maxPrice) return false;
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        token.symbol.toLowerCase().includes(searchLower) ||
        token.name.toLowerCase().includes(searchLower) ||
        token.address.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    return true;
  });
}
