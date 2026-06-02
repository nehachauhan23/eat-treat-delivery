export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatus =
  | "ORDER_RECEIVED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";
