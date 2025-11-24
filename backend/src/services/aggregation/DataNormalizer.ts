// Data normalizer service
import { IToken } from '../../domain/interfaces/IToken';

export class DataNormalizer {
  normalizeToken(rawData: any, source: string): IToken {
    return {
      chain: this.normalizeChain(rawData.chain || rawData.chainId),
      address: this.normalizeAddress(rawData.address || rawData.mint),
      symbol: rawData.symbol?.toUpperCase() || '',
      name: rawData.name || '',
      decimals: rawData.decimals || 0,
      price: rawData.price || rawData.priceUsd,
      liquidity: rawData.liquidity || rawData.liquidityUsd,
      sources: [source],
      lastUpdated: new Date(),
    };
  }

  private normalizeChain(chain: string): string {
    return chain?.toLowerCase() || 'unknown';
  }

  private normalizeAddress(address: string): string {
    return address?.toLowerCase() || '';
  }
}
