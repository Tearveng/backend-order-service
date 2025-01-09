export interface payloadItems {
  skuCode: string;
  quantity: number;
  discount: number;
}

export interface OrderPayload {
  items: payloadItems[];
  profileId: number | string;
}
