import { PaymentService } from "./payment.service"
import { Body, Controller, Post } from "@nestjs/common"

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    return this.paymentService.createPaymentIntent(amount, currency);
  }
}