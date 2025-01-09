import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { ItemsEntity } from '../../entities/Items';
import { ClientService } from '../../shared/services/ClientService';
import { ItemPayload } from '../../models/Item.interface';
import { circularJSON } from '../../shared/circularJSON';
import { ResponseProduct } from '../../models/Product.interface';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(ItemsEntity)
    private readonly orderRepository: Repository<ItemsEntity>,
    private readonly httpService: HttpService,
    private readonly clientService: ClientService,
  ) {}

  async createItem(payload: ItemPayload) {
    const { productId, quantity, variant } = payload;

    // get product
    const product = circularJSON.convertJsonStringToObject(
      await this.clientService.getProductById(productId),
    ) as ResponseProduct;
  }
}
