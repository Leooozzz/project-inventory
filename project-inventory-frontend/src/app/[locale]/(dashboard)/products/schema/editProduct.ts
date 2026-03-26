import z from "zod";

const unitTypeEnum = z.enum(["Kg", "g", "l", "ml", "un"]);
export const editProductSchema = z.object({
  name: z.string().min(2).optional(),
  categoryId: z.string().min(1).optional(),
  unitPrice: z.number().optional(),
  unitType: unitTypeEnum.optional(),
  quantity: z.string().min(1).optional(),
  maximumQuantity: z.string().min(1).optional(),
  minimumQuantity: z.string().min(1).optional(),
});

export type productEditFormData = z.infer<typeof editProductSchema>;
