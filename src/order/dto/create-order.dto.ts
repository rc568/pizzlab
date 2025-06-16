import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  product_code: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
