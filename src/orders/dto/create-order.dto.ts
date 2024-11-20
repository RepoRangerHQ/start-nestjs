import { IsNotEmpty, IsNumber, Min, IsMongoId } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly productId: string;

  @IsNumber()
  @Min(1)
  readonly quantity: number = 1;
}
