import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderPayload } from '../../models/Order.interface';
import { OrdersService } from './order.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('/create-orders')
  async create(@Body() payload: OrderPayload) {
    return this.orderService.createOrder(payload);
  }

  @Get()
  async getAllOrdersPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string,
  ) {
    return this.orderService.paginateOrders(page, limit, search);
  }

  @Get('/order-summary')
  async getOrderSummary() {
    return this.orderService.orderSummary();
  }

  @Get('/:id')
  async getOrderByDetail(@Param('id') id: string) {
    return this.orderService.findOrderById(id);
  }

  @Put('/update-orders/:id')
  async update(@Param('id') id: string, @Body() payload: OrderPayload) {
    return this.orderService.updateOrder(id, payload);
  }
}
