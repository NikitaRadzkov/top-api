import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';

@Module({
  imports: [AuthModule, ProductModule, ReviewModule, TopPageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
