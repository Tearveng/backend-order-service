import { OrdersEntity } from '../entities/Orders';

export interface ItemPayload {
  productCode: string;
  stockSkuCode: string;
  discount: number;
  quantity: number;
  variant: object;
  clientId: number;
  profileId: number;
  order: OrdersEntity;
}
