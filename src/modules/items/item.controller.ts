import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ItemsService } from './item.service';
import { ItemPayload } from '../../models/Item.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Post('/create-items')
  async create(@Body() payload: ItemPayload) {
    return this.itemService.createItem(payload);
  }

  @Get()
  async getAllItemsPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.itemService.paginateItems(page, limit);
  }

  // @Put('/update-orders/:id')
  // async update(@Param('id') id: number, @Body() payload: OrderPayload) {
  //     return this.orderService.updateOrder(id, payload);
  // }
}
