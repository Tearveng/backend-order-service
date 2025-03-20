export interface PayloadItems {
  id: number;
  code: string;
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
