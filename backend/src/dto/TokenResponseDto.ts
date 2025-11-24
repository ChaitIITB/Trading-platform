// Token response DTO
export class TokenResponseDto {
  chain: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  price?: number;
  liquidity?: number;
  sources?: string[];
  lastUpdated?: string;

  constructor(data: any) {
    this.chain = data.chain;
    this.address = data.address;
    this.symbol = data.symbol;
    this.name = data.name;
    this.decimals = data.decimals;
    this.price = data.price;
    this.liquidity = data.liquidity;
    this.sources = data.sources;
    this.lastUpdated = data.lastUpdated?.toISOString();
  }
}
