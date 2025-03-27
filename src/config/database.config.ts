import { registerAs } from '@nestjs/config';
import { CartsEntity } from '../entities/Carts';
import { ItemsEntity } from '../entities/Items';
import { OrdersEntity } from '../entities/Orders';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, //'eiii_kommerce'
  entities: [OrdersEntity, CartsEntity, ItemsEntity],
  synchronize: true,
  logging: false, // process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'order_migrations',
}));
