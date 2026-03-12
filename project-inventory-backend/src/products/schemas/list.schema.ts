import z from "zod";

export const listProductsSchema = z.object({
    name:z.string().min(2,"Miminimum 2 characters").optional(),
    offset:z.coerce.number().int().min(0).optional().default(0),
    limit:z.coerce.number().int().min(1).optional().default(10)
})