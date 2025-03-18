import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../../entities/Orders';
import { OrderPayload, PayloadItems } from '../../models/Order.interface';
import { Product, ResponseProduct } from '../../models/Product.interface';
import { circularJSON } from '../../shared/circularJSON';
import { ClientService } from '../../shared/services/ClientService';
import { calculateTotal } from '../../utils/CalculateTotal';
import { eFindBySkuCode } from '../../utils/EFoundBySkuCode';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
    private readonly clientService: ClientService,
  ) {}

  async findOrderById(id: number): Promise<OrdersEntity> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async orderProcess(payload: OrderPayload) {
    const productPayload = `${payload.items.flatMap((item: PayloadItems) => item.skuCode).join(',')}`;
    // get products
    const products = circularJSON.convertJsonStringToObject(
      await this.clientService.getProducts(`${productPayload}`),
    ) as ResponseProduct;
    // update quantity
    const updateQuantity = {
      ...products,
      data: products.data.map((item: Product) => ({
        ...item,
        quantity: eFindBySkuCode(item.skuCode, payload.items).quantity,
      })),
    };
    // get total
    const total = products.data
      .flatMap((p: Product) =>
        calculateTotal(p.price, eFindBySkuCode(p.skuCode, payload.items)),
      )
      .reduce((acc, current) => acc + current, 0);

    return { products: updateQuantity, total };
  }

  // find all orders pagination
  async paginateOrders(page = 1, limit = 10) {
    const [orders, total] = await this.orderRepository.findAndCount({
      order: {
        createdAt: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: orders,
      meta: {
        totalItems: total,
        itemCount: orders.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async clientProcess(id: number) {
    return circularJSON.convertJsonStringToObject(
      await this.clientService.getProfileById(id),
    );
  }

  // create order
  async createOrder(payload: OrderPayload) {
    const profile = await this.clientProcess(payload.profileId);
    const client = await this.clientProcess(payload.clientId);
    console.log('client', client);
    const processing = await this.orderProcess(payload);
    const creatOrder = this.orderRepository.create({
      ...payload,
      total: processing.total,
      subtotal: processing.total,
      totalPrice: processing.total,
    });

    const saveOrder = await this.orderRepository.save(creatOrder);
    this.logger.log('order is created', saveOrder);
    return {
      ...saveOrder,
      items: processing.products.data,
      profile: profile,
      client: client
    };
  }

  // update order
  async updateOrder(id: number, payload: OrderPayload) {
    const processing = await this.orderProcess(payload);
    const previous = await this.findOrderById(id);
    const saveOrder = await this.orderRepository.save({
      ...previous,
      items: processing.products.data,
      total: processing.total,
    });
    this.logger.log('order is updated', saveOrder);
    return saveOrder;
  }
}
