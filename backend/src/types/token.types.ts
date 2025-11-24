// Token types
export type TokenChain = 'ethereum' | 'solana' | 'bsc' | 'polygon';

export interface TokenSource {
  name: string;
  price?: number;
  liquidity?: number;
  timestamp: Date;
}

export interface TokenMetadata {
  logoUrl?: string;
  description?: string;
  website?: string;
  twitter?: string;
}
