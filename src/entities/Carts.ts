import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ItemsEntity } from './Items';

@Entity()
export class CartsEntity {
  @PrimaryGeneratedColumn('uuid')
  cartId: string;

  @Column()
  userId: number;

  // @OneToMany(() => ItemsEntity, (cartItem) => cartItem.cart, { cascade: true })
  // items: ItemsEntity[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  shippingCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  couponCode: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  discountsApplied: number;

  @Column({ default: false })
  isSavedForLater: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
