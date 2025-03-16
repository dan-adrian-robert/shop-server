import { CheckoutDto } from "../dto/checkout.dto"

export const CHECKOUT_BODY = {
  type: CheckoutDto,
  description: 'Checkout payload',
  examples: {
    example1: {
      summary: 'Payload 1',
      value: {
        total: 150,
        products: [
          {
            id: 1,
            amount: 5,
          },
          {
            id: 2,
            amount: 3,
          }
        ]
      }
    }
  }
}