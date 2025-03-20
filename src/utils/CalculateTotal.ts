import { PayloadItems } from '../models/Order.interface';

export const calculateTotal = (
  price: number,
  item: PayloadItems | null,
  discount = 0,
) => {
  if (item) {
    return price * item.quantity * (1 - discount / 100);
  }
  return price;
};
