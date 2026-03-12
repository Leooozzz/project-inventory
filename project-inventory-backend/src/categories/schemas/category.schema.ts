import z from "zod";

export const categoryIdSchema = z.object({
    id: z.uuid("Invalid category id format")
})