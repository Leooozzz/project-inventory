import z from "zod";

export const listMovesSchema = z.object({
    productId:z.uuid("Invalid ID format").optional(),
    offset:z.coerce.number().min(0).default(0),
    limit:z.coerce.number().min(1).default(10)
})
export type listMosvesInput = z.infer<typeof listMovesSchema>