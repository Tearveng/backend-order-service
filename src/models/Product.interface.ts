export interface Product {
  id: number;
  name: string;
  description: string;
  skuCode: string;
  price: number;
  quantity: number;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseProduct {
  data: Product[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface Stock {
  id: number;
  name: string;
  description: string;
  skuCode: string;
  price: number;
  quantity: number;
  thumbnail: string | null;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseStock {
  data: Stock[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
