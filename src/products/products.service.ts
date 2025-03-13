import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProductList(): Array<unknown> {
    const result: Array<unknown> = [
      {
        id: 1,
        username: 'testuser',
      }
    ];

    return result;
  }
}
