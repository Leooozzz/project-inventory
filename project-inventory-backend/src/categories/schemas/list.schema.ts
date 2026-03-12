import z from "zod";

export const listCategoriesSchema = z.object({
    includeProductCount:z.coerce.boolean().optional().default(false)
})