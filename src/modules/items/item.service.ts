import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsEntity } from '../../entities/Items';
import { ClientService } from '../../shared/services/ClientService';
import { ItemPayload } from '../../models/Item.interface';
import { circularJSON } from '../../shared/circularJSON';
import { Product } from '../../models/Product.interface';
import { CartsEntity } from '../../entities/Carts';
import {CartsService} from "../carts/cart.service";

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
    const { productId, quantity, variant } = payload;

    // get product
    const product = circularJSON.convertJsonStringToObject(
      await this.clientService.getProductById(productId),
    ) as Product;
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // get cart
    const cart = await this.cartService.findCartById(1);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = this.itemRepository.create({
      productId,
      cart,
      quantity,
      variant,
      sku: '',
      subtotal: 0,
      name: product.name,
      price: product.price,
      totalPrice: product.price * quantity,
    });
    const saveItem = await this.itemRepository.save(item);
    this.logger.log('cart is created', saveItem);
    return saveItem;
  }
}
