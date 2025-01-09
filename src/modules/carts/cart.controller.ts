import { Body, Controller, Post } from '@nestjs/common';
import { CartsService } from './cart.service';
import { CartPayload } from '../../models/Cart.interface';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post('/create-carts')
  async create(@Body() payload: CartPayload) {
    return this.cartService.createCart(payload);
  }

  // @Put('/update-orders/:id')
  // async update(@Param('id') id: number, @Body() payload: OrderPayload) {
  //     return this.orderService.updateOrder(id, payload);
  // }
}
