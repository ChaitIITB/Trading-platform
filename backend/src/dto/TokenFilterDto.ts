// Token filter DTO
export class TokenFilterDto {
  chain?: string;
  minLiquidity?: number;
  maxLiquidity?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}
