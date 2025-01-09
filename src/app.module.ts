import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules/orders/order.module';
import { DataSource } from 'typeorm';
import { OrdersEntity } from './entities/Orders';
import {ItemsEntity} from "./entities/Items";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'eiii_kommerce',
      entities: [OrdersEntity, ItemsEntity],
      synchronize: true,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
