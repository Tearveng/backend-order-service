import { Injectable, Logger } from '@nestjs/common';
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
    private readonly clientService: ClientService,
    private readonly cartRepository: Repository<CartsEntity>,
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
}
