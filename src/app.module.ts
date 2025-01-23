import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules/orders/order.module';
import { DataSource } from 'typeorm';
import { HeadersMiddleware } from './shared/services/HeadersMiddleware';
import { RequestContextService } from './shared/services/RequestContextService';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config';
import { CartModule } from './modules/carts/cart.module';
import { ItemModule } from './modules/items/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    CartModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequestContextService],
})
export class AppModule implements NestModule {
  constructor(private readonly dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    // Apply the middleware globally
    consumer.apply(HeadersMiddleware).forRoutes('*');
  }
}
