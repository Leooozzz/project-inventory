import z from "zod";

export const listCategoriesShema = z.object({
    includeProductCount:z.boolean().optional().default(false)
})