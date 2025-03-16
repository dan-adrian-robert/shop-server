import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { ProductsService } from './products.service';
import { ProductDto } from "./dto/product.dto"
import { BULK_CREATE_PRODUCTS } from "./swagger/bulk.create.swagger"
import { CHECKOUT_BODY } from "./swagger/checkout.swagger"
import { CheckoutDto } from "./dto/checkout.dto"

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getProductList(): Promise<Array<ProductDto>> {
    return await this.productService.getProductList();
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  create(@Body() createProductDto: ProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit product' })
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete by id' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all' })
  clearAll() {
    return this.productService.clearAll();
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Bulk create products' })
  @ApiBody(BULK_CREATE_PRODUCTS)
  createBulk(@Body() productList: {products: Array<ProductDto>}) {
    return this.productService.createBulk(productList.products);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'checkout' })
  @ApiBody(CHECKOUT_BODY)
  validateProducts(@Body() body: CheckoutDto) {
    return this.productService.checkout(body);
  }
}
