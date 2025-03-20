import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosConfigModule } from '../../config/axios/axios-config.module';
import { ItemsEntity } from '../../entities/Items';
import { ItemsController } from './item.controller';
import { ItemsService } from './item.service';
import { ClientService } from '../../shared/services/ClientService';
import { CartModule } from '../carts/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsEntity]),
    AxiosConfigModule,
    CartModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ClientService, HttpService],
  exports: [ItemsService],
})
export class ItemModule {}
