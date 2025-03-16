import { ProductDto } from "../dto/product.dto"

export const BULK_CREATE_PRODUCTS = {
  type: Array<ProductDto>,
  description: 'Array of products to create',
  examples: {
    example1: {
      summary: 'Example bulk create',
      value: {
        products: [
          {
            name: 'Product 1',
            description: 'Description of Product 1',
            price: 29,
            stock: 100
          },
          {
            name: 'Product 2',
            description: 'Description of Product 2',
            price: 49,
            stock: 50
          }
        ]
      }
    }
  }
}