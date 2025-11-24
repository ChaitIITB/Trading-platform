// Data merger service
import { IToken } from '../../domain/interfaces/IToken';

export class DataMerger {
  mergeTokens(tokens: IToken[]): IToken[] {
    const merged = new Map<string, IToken>();

    for (const token of tokens) {
      const key = `${token.chain}:${token.address.toLowerCase()}`;
      
      if (!merged.has(key)) {
        merged.set(key, { ...token });
      } else {
        const existing = merged.get(key)!;
        merged.set(key, this.mergeTwoTokens(existing, token));
      }
    }

    return Array.from(merged.values());
  }

  private mergeTwoTokens(token1: IToken, token2: IToken): IToken {
    return {
      ...token1,
      price: token1.price || token2.price,
      liquidity: Math.max(token1.liquidity || 0, token2.liquidity || 0),
      sources: [...(token1.sources || []), ...(token2.sources || [])],
      lastUpdated: new Date(),
    };
  }
}
