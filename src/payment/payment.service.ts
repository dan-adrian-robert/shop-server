import { Injectable } from "@nestjs/common"
import Stripe from 'stripe';
import { ConfigService } from "@nestjs/config"


@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const key: string = this.configService.get<string>('STRIPE_SECRET_KEY') as string;
    this.stripe = new Stripe(key, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
  }
}