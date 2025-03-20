import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsEntity } from '../../entities/Items';
import { ClientService } from '../../shared/services/ClientService';
import { ItemPayload } from '../../models/Item.interface';
import { circularJSON } from '../../shared/circularJSON';
import { Product, Stock } from '../../models/Product.interface';
import { CartsEntity } from '../../entities/Carts';
import { CartsService } from '../carts/cart.service';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(ItemsEntity)
    private readonly itemRepository: Repository<ItemsEntity>,
    private readonly cartService: CartsService,
    private readonly clientService: ClientService,
  ) {}

  async findCartById(cartId: number): Promise<CartsEntity> {
    const cart = await this.cartService.findCartById(cartId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async createItem(payload: ItemPayload) {
    const {
      productCode,
      stockSkuCode,
      quantity,
      variant,
      clientId,
      profileId,
      order,
    } = payload;

    // get product
    const product = circularJSON.convertJsonStringToObject(
      await this.clientService.getProductByCode(productCode),
    ) as Product;
    const stock = circularJSON.convertJsonStringToObject(
      await this.clientService.getStockBySkuCode(stockSkuCode),
    ) as Stock;
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    const item = this.itemRepository.create({
      productCode,
      quantity,
      variant,
      clientId,
      profileId,
      sku: stock.skuCode,
      subtotal: 0,
      name: stock.name,
      price: stock.price,
      totalPrice: stock.price * quantity * (1 - stock.discount / 100),
      stockUrl: stock.thumbnail,
      productUrl: product.thumbnail,
    });
    item.order = order;
    const saveItem = await this.itemRepository.save(item);
    this.logger.log('item is created', saveItem);
    return saveItem;
  }
}
