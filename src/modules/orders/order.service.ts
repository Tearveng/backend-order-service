import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { OrdersEntity } from '../../entities/Orders';
import { OrderPayload, PayloadItems } from '../../models/Order.interface';
import {
  Product,
  ResponseProduct,
  ResponseStock,
  Stock,
} from '../../models/Product.interface';
import { circularJSON } from '../../shared/circularJSON';
import { ClientService } from '../../shared/services/ClientService';
import { calculateTotal } from '../../utils/CalculateTotal';
import { eFindBySkuCode } from '../../utils/EFoundBySkuCode';
import { ItemsService } from '../items/item.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
    @Inject(forwardRef(() => ItemsService))
    private readonly itemService: ItemsService,
    private readonly clientService: ClientService,
  ) {}

  async findOrderById(id: string): Promise<OrdersEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        items: true,
      },
    });
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

  async orderStockProcess(payload: OrderPayload) {
    const stockPayload = `${payload.items.flatMap((item: PayloadItems) => item.skuCode).join(',')}`;
    // get products
    const stocks = circularJSON.convertJsonStringToObject(
      await this.clientService.getStocks(`${stockPayload}`),
    ) as ResponseStock;
    // update quantity
    const updateQuantity = {
      ...stocks,
      data: stocks.data.map((item: Stock) => ({
        ...item,
        quantity: eFindBySkuCode(item.skuCode, payload.items).quantity,
      })),
    };
    // get total
    const total = stocks.data
      .flatMap((p: Stock) =>
        calculateTotal(
          p.price,
          eFindBySkuCode(p.skuCode, payload.items),
          p.discount,
        ),
      )
      .reduce((acc, current) => acc + current, 0);
    const subTotal = stocks.data
      .flatMap((p: Stock) =>
        calculateTotal(p.price, eFindBySkuCode(p.skuCode, payload.items)),
      )
      .reduce((acc, current) => acc + current, 0);

    return { stocks: updateQuantity, subTotal, total };
  }

  async stockSoldProcess(stocks: Stock[]) {
    // get products
    return circularJSON.convertJsonStringToObject(
      await this.clientService.stockSold(stocks),
    );
  }

  // order summary
  async orderSummary() {
    const status = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.status', 'status')
      .addSelect('COUNT(order.id)', 'count')
      .groupBy('order.status')
      .orderBy('order.status', 'ASC')
      .getRawMany();
    const orderAmount = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.subtotal)', 'subtotal')
      .getRawOne();
    const revenue = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalPrice)', 'total')
      .getRawOne();
    return {
      status,
      orderAmount,
      revenue,
    };
  }

  // find all orders pagination
  async paginateOrders(page = 1, limit = 10, search: string = '') {
    const results = [];
    const [orders, total] = await this.orderRepository.findAndCount({
      where: {
        id: Like(`%${search}%`),
      },
      order: {
        createdAt: 'desc',
      },
      relations: {
        items: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    for (const order of orders) {
      const profile = await this.clientProcess(order.profileId);
      const client = await this.clientProcess(order.clientId);
      results.push({ ...order, profile, client });
    }

    return {
      data: results,
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
    const processing = await this.orderStockProcess(payload);
    this.logger.log('stock processing', processing);
    await this.stockSoldProcess(processing.stocks.data);
    const creatOrder = this.orderRepository.create({
      ...payload,
      status: 'DONE',
      total: processing.total,
      subtotal: processing.subTotal,
      totalPrice: processing.total,
    });
    const saveOrder = await this.orderRepository.save(creatOrder);
    for (const item of payload.items) {
      const getStock = processing.stocks.data.find(
        (st) => st.skuCode === item.skuCode,
      );
      if (getStock) {
        await this.itemService.createItem({
          quantity: item.quantity,
          productCode: item.code,
          stockSkuCode: item.skuCode,
          profileId: profile.id,
          clientId: client.id,
          order: saveOrder,
          discount: getStock.discount,
          variant: {},
        });
      }
    }
    this.logger.log('order is created', saveOrder);
    return {
      ...saveOrder,
      profile: profile,
      client: client,
    };
  }

  // update order
  async updateOrder(id: string, payload: OrderPayload) {
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
