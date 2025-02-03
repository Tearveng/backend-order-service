import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CartsService } from './cart.service';
import { CartPayload } from '../../models/Cart.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post('/create-carts')
  async create(@Body() payload: CartPayload) {
    console.log("CartPayload", payload)
    return this.cartService.createCart(payload);
  }

  @Get()
  async getAllCartsPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.cartService.paginateCarts(page, limit);
  }
}
