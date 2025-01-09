import { payloadItems } from '../models/Order.interface';

export const eFindBySkuCode = (skuCode: string, items: payloadItems[]) => {
  const item = items.find((item) => item.skuCode === skuCode);

  return item ?? null;
};

