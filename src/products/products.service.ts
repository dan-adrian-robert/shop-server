import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ProductEntity } from "../../entities/product.entity"
import { ProductDto } from "./dto/product.dto"

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {
  }

  async getProductList(): Promise<Array<ProductDto>> {
    return this.productRepository.find();
  }

  create(createProductDto: ProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: ProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
    return { deleted: true };
  }

  createBulk(productList: Array<ProductDto>) {
    try {
      const products = this.productRepository.create(productList);

      return this.productRepository.save(products);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async clearAll() {
    await this.productRepository.clear();
    return { cleared: true };
  }

}
