import { api } from "./client";
import type { Order } from "../types";
export const createOrder = async (payload: {
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: {
    menuItemId: string;
    quantity: number;
  }[];
}) => {
  console.log("data : ", payload);
  
  const { data } = await api.post("/orders", payload);
  console.log(" data : ", data );
  
  return data;
};

export const getOrder = async (id: string): Promise<Order> => {
  const { data } = await api.get(`/orders/${id}`);

  return data;
};