import { PayloadItems } from '../models/Order.interface';

export const eFindBySkuCode = (skuCode: string, items: PayloadItems[]) => {
  const item = items.find((item) => item.skuCode === skuCode);

  return item ?? null;
};

