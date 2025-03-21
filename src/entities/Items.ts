import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { OrdersEntity } from './Orders';

@Entity()
export class ItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  itemId: number;

  @ManyToOne(() => OrdersEntity, (order) => order.items)
  order: OrdersEntity;

  @Column()
  productCode: string;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2.0 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2.0, default: 0 })
  discount: number;

  @Column('json')
  variant: object;

  @Column()
  sku: string;

  @Column('decimal', { precision: 10, scale: 2.0 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2.0, default: 0 })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2.0 })
  totalPrice: number;

  @Column()
  profileId: number;

  @Column()
  clientId: number;

  @Column({ default: '' })
  stockUrl: string;

  @Column({ default: '' })
  productUrl: string;

  @Column({ default: false })
  isInStock: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
