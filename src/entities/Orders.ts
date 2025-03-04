import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../models/Product.interface';
import { Profile } from '../models/Profile.interface';

@Entity()
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  profileId: number;

  @Column({ type: 'int' })
  clientId: number;

  @Column({ default: '' })
  refererCode: string;

  @Column({ default: 0 })
  discount: number;

  @Column()
  total: number;

  profile: Profile;

  client: Profile;

  items: Product[];

  @Column()
  subtotal: number;

  @Column()
  totalPrice: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({nullable: true})
  couponCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
