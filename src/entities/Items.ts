import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CartsEntity } from './Carts';

@Entity()
export class ItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  itemId: number;

  @ManyToOne(() => CartsEntity, (cart) => cart.items)
  @JoinColumn({ name: 'cartId' })
  cart: CartsEntity;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2.0 })
  price: number;

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

  @Column({ default: '' })
  productImage: string;

  @Column({ default: '' })
  productUrl: string;

  @Column({ default: false })
  isInStock: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
