import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsEntity } from '../../entities/Carts';
import { ClientService } from '../../shared/services/ClientService';
import { circularJSON } from '../../shared/circularJSON';
import { CartPayload } from '../../models/Cart.interface';
import { Profile } from '../../models/Profile.interface';
import { UserDTO } from '../../entities/dto/UserDTO';
import { omit } from '../../utils/RemoveAttribute';

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
    const user = circularJSON.convertJsonStringToObject(
      await this.clientService.getProfileById(userId),
    ) as Profile;
    const cart = this.cartRepository.create({
      userId: user.id,
      items: [],
    });
    const saveCart = await this.cartRepository.save(cart);
    this.logger.log('cart is created', saveCart);
    return saveCart;
  }

  async paginateCarts(page = 1, limit = 10) {
    const [carts, total] = await this.cartRepository.findAndCount({
      order: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const fakeUser: UserDTO = {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Smith',
      username: 'Admin Smith',
    };
    // const userIds = carts.flatMap((cart) => cart.userId);
    // const newUserIds = [...new Set(userIds)];

    return {
      meta: {
        totalItems: total,
        itemCount: carts.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      data: carts.map((cart) => ({ ...omit(cart, 'userId'), user: fakeUser })),
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
