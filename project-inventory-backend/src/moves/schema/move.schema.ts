import z from "zod";

const moveType = z.enum(['in','out'])
export const moveSchema = z.object({
    productId:z.uuid("Invalid product ID format"),
    type: moveType,
    quantity: z.coerce.number().positive("Quantity must be positive").transform(String),
})