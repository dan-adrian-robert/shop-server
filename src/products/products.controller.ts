import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { ProductsService } from './products.service';
import { ProductDto } from "./dto/product.dto"
import { BULK_CREATE_PRODUCTS } from "./swagger/bulk.create.swagger"

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
  create(@Body() createProductDto: ProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Delete()
  clearAll() {
    return this.productService.clearAll();
  }

  @Post('bulk')
  @ApiBody(BULK_CREATE_PRODUCTS)
  createBulk(@Body() productList: {products: Array<ProductDto>}) {
    return this.productService.createBulk(productList.products);
  }
}
