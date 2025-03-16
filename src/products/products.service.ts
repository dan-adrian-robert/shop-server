import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { ProductEntity } from "../../entities/product.entity"
import { ProductDto } from "./dto/product.dto"
import { CheckoutDto } from "./dto/checkout.dto"

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

  async calculateTotalPrice(products: { id: number; amount: number }[]): Promise<number> {
    let totalPrice = 0;

    const productIds = products.map(product => product.id);

    const productEntities = await this.productRepository.findBy({ id: In(productIds) });

    const productMap = new Map(productEntities.map(product => [product.id, product.price]));

    for (const item of products) {
      const productPrice = productMap.get(item.id);
      if (productPrice !== undefined) {
        totalPrice += productPrice * item.amount;
      }
    }

    return totalPrice;
  }

  async checkStockAvailability(products: { id: number; amount: number }[]): Promise<any> {
    const productIds = products.map(product => product.id);

    const productEntities = await this.productRepository.findBy({ id: In(productIds) });

    const productStockMap = new Map(productEntities.map(product => [product.id, product.stock]));

    const insufficientStock: Array<any> = [];

    for (const item of products) {
      const availableStock = productStockMap.get(item.id);
      if (availableStock === undefined || availableStock < item.amount) {
        insufficientStock.push({ id: item.id, available: availableStock || 0, requested: item.amount });
      }
    }

    return { available: !(insufficientStock.length > 0), insufficientStock };
  }

  async checkout(body: CheckoutDto) {

    const totalPrice = await this.calculateTotalPrice(body.products)
    const inStock = await this.checkStockAvailability(body.products)
   return Promise.resolve({inStock, totalPrice})
  }

}
