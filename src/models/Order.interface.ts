export interface PayloadItems {
  id: number;
  skuCode: string;
  quantity: number;
  discount: number;
}

export interface OrderPayload {
  items: PayloadItems[];
  clientId: number;
  profileId: number;
  address: string;
}
