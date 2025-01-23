import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosConfigModule } from '../../config/axios/axios-config.module';
import { CartsEntity } from '../../entities/Carts';
import { CartsService } from './cart.service';
import { CartsController } from './cart.controller';
import { ClientService } from '../../shared/services/ClientService';

@Module({
  imports: [TypeOrmModule.forFeature([CartsEntity]), AxiosConfigModule],
  controllers: [CartsController],
  providers: [CartsService, ClientService, HttpService],
  exports: [CartsService],
})
export class CartModule {}
