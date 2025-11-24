// Token entity
export class TokenEntity {
  constructor(
    public chain: string,
    public address: string,
    public symbol: string,
    public name: string,
    public decimals: number,
    public price?: number,
    public liquidity?: number,
    public sources?: string[],
    public lastUpdated?: Date
  ) {}
}
