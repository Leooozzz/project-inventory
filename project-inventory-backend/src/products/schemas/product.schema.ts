import z from "zod";

export const produtIdSchema = z.object({
    id: z.uuid("Invalid product ID format")
})