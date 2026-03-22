import z from "zod";

const unitTypeEnum = z.enum(["Kg", "g", "l", "ml", "un"]);
export const createProductSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().min(1),
  unitPrice: z.number(),
  unitType: unitTypeEnum,
  quantity: z.string().min(1),
  maximumQuantity: z.string().min(1),
  minimumQuantity: z.string().min(1),
});

export type productFormData = z.infer<typeof createProductSchema>;
