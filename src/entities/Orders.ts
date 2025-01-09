import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';
import { Product } from '../models/Product.interface';
import { Profile } from '../models/Profile.interface';

@Entity()
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  refererCode: string;

  @Column({ default: 0 })
  discount: number;

  @Column()
  total: number;

  profile: Profile;

  items: Product[];

  @Column()
  subtotal: number;

  @Column()
  totalPrice: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column()
  couponCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
