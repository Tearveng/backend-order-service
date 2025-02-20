export interface PayloadItems {
  id: number;
  skuCode: string;
  quantity: number;
  discount: number;
}

export interface OrderPayload {
  items: PayloadItems[];
  profileId: number | string;
  address: string;
}
