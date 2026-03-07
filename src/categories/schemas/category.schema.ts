import z from "zod";

export const createCategorySchema = z.object({
    name:z.string().min(2,"The category name must have at least 8 characters.").max(255)
})