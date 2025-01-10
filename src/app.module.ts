import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules/orders/order.module';
import { DataSource } from 'typeorm';
import { OrdersEntity } from './entities/Orders';
import { ItemsEntity } from './entities/Items';
import { HeadersMiddleware } from './shared/services/HeadersMiddleware';
import { RequestContextService } from './shared/services/RequestContextService';
import { CartsEntity } from './entities/Carts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'eiii_kommerce',
      entities: [OrdersEntity, ItemsEntity, CartsEntity],
      synchronize: true,
    }),
    OrderModule,
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
