import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from "./payment/payment.module"
import { FileUploadModule } from "./file-upload/file-upload.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    AuthModule,
    ProductsModule,
    DatabaseModule,
    UsersModule,
    PaymentModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
