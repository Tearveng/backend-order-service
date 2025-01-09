import { payloadItems } from '../models/Order.interface';

export const calculateTotal = (price: number, item: payloadItems | null) => {
  if (item) {
    return price * item.quantity;
  }
  return price;
};
