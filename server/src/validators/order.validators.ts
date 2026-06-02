import { z } from "zod";

export const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    address: z.string().min(5),
    phone: z.string().min(10),
  }),
  items: z
    .array(
      z.object({
        menuItemId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;