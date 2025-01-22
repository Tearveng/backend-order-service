import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CartsEntity } from '../src/entities/Carts';
import { ItemsEntity } from '../src/entities/Items';
import { OrdersEntity } from '../src/entities/Orders';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  // entities: [`${__dirname}/../src/**/*{.ts,.js}`],
  entities: [CartsEntity, ItemsEntity, OrdersEntity],
  synchronize: false,
  logging: configService.get('nodenv') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'order_migrations',
});
