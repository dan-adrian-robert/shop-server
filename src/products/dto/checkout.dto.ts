import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty({ example: 'apples', description: 'List of products', required: true })
  products: Array<{
    id: number,
    amount: number,
  }>;

  @ApiProperty({ example: 150, description: 'Total price of the cart', required: true })
  total: number;
}
