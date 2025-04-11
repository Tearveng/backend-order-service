import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../models/Profile.interface';
import { ItemsEntity } from './Items';

@Entity()
export class OrdersEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

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

  @BeforeInsert()
  async generateCustomId() {
    const count = await OrdersEntity.count(); // 👈 count existing records
    const nextId = count + 1;
    this.id = `${String(nextId).padStart(6, '0')}`; // ➜ "#000024"
  }

  profile: Profile;

  client: Profile;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ default: '' })
  address: string;

  @OneToMany(() => ItemsEntity, (item) => item.order)
  items: ItemsEntity[];

  @Column()
  subtotal: number;

  @Column()
  totalPrice: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  couponCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
