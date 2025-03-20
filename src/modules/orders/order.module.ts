import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { OrdersEntity } from '../../entities/Orders';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosConfigModule } from '../../config/axios/axios-config.module';
import { ClientService } from '../../shared/services/ClientService';
import { ItemModule } from '../items/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity]),
    AxiosConfigModule,
    ItemModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ClientService, HttpService],
})
export class OrderModule {}
