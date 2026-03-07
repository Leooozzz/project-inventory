import z from "zod";

export const listUserSchema = z.object({
    offset: z.coerce.number().int().min(0).optional().default(0),
    limit: z.coerce.number().int().min(1).optional().default(10)
})