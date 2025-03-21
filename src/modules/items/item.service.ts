import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsEntity } from '../../entities/Items';
import { ClientService } from '../../shared/services/ClientService';
import { ItemPayload } from '../../models/Item.interface';
import { circularJSON } from '../../shared/circularJSON';
import { Product, Stock } from '../../models/Product.interface';
import { CartsEntity } from '../../entities/Carts';
import { CartsService } from '../carts/cart.service';
import { OrdersService } from '../orders/order.service';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(ItemsEntity)
    private readonly itemRepository: Repository<ItemsEntity>,
    private readonly cartService: CartsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly orderService: OrdersService,
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
      discount,
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
      discount,
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

  // find all items pagination
  async paginateItems(page = 1, limit = 10) {
    const results = [];
    const [items, total] = await this.itemRepository.findAndCount({
      order: {
        createdAt: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    for (const item of items) {
      const profile = await this.orderService.clientProcess(item.profileId);
      const client = await this.orderService.clientProcess(item.clientId);
      results.push({ ...item, profile, client });
    }

    return {
      data: results,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
