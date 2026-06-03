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


export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
}