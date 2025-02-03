import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsEntity } from '../../entities/Carts';
import { ClientService } from '../../shared/services/ClientService';
import { circularJSON } from '../../shared/circularJSON';
import { CartPayload } from '../../models/Cart.interface';
import { Profile } from '../../models/Profile.interface';

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name);

  constructor(
    @InjectRepository(CartsEntity)
    private readonly cartRepository: Repository<CartsEntity>,
    private readonly clientService: ClientService,
  ) {}

  async createCart(payload: CartPayload) {
    const { userId } = payload;
    const cart = this.cartRepository.create({
      userId,
      items: [],
    });
    const saveCart = await this.cartRepository.save(cart);
    this.logger.log('cart is created', saveCart);
    return saveCart;
  }

  async paginateCarts(page = 1, limit = 10) {
    const remapCarts: any[] = [];
    const [carts, total] = await this.cartRepository.findAndCount({
      order: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const getUser = async (userId: string) => {
      return circularJSON.convertJsonStringToObject(
        await this.clientService.getProfileById(userId),
      ) as Profile;
    };

    for (const cart of carts) {
      const user = await getUser(`${cart.userId}`);
      remapCarts.push({ ...cart, user });
    }

    return {
      meta: {
        totalItems: total,
        itemCount: carts.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      data: remapCarts,
    };
  }

  // find cart by id
  async findCartById(id: number) {
    const cart = await this.cartRepository.findOneBy({ userId: 1 });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }
}
