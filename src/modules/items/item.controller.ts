import { Body, Controller, Post } from '@nestjs/common';
import { ItemsService } from './item.service';
import { ItemPayload } from '../../models/Item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Post('/create-items')
  async create(@Body() payload: ItemPayload) {
    return this.itemService.createItem(payload);
  }

  // @Put('/update-orders/:id')
  // async update(@Param('id') id: number, @Body() payload: OrderPayload) {
  //     return this.orderService.updateOrder(id, payload);
  // }
}
