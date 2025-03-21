import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosConfigModule } from '../../config/axios/axios-config.module';
import { ItemsEntity } from '../../entities/Items';
import { ItemsController } from './item.controller';
import { ItemsService } from './item.service';
import { ClientService } from '../../shared/services/ClientService';
import { CartModule } from '../carts/cart.module';
import { OrderModule } from '../orders/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsEntity]),
    AxiosConfigModule,
    CartModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ClientService, HttpService],
  exports: [ItemsService],
})
export class ItemModule {}
