import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'apples', description: 'The name of the product', required: false })
  id: number;

  @ApiProperty({ example: 'apples', description: 'The name of the product', required: true })
  name: string;

  @ApiProperty({ example: 'Basic description', description: 'The description of the product', required: true })
  description: string;

  @ApiProperty({ example: 25, description: 'The price of the product', required: true })
  price: number;

  @ApiProperty({ example: 10, description: 'How many items are in stock', required: true })
  stock: number;
}
