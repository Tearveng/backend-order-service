import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrderPayload } from '../../models/Order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('/create-orders')
  async create(@Body() payload: OrderPayload) {
    return this.orderService.createOrder(payload);
  }

  @Put('/update-orders/:id')
  async update(@Param('id') id: number, @Body() payload: OrderPayload) {
    return this.orderService.updateOrder(id, payload);
  }
}
