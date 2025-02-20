import { PayloadItems } from '../models/Order.interface';

export const calculateTotal = (price: number, item: PayloadItems | null) => {
  if (item) {
    return price * item.quantity;
  }
  return price;
};
