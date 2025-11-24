// Token interface
export interface IToken {
  chain: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  price?: number;
  liquidity?: number;
  sources?: string[];
  lastUpdated?: Date;
}
