import z from "zod";

export const updateCategorySchema = z.object({
    name:z.string().min(2,"Minimum of 2 characters").max(255)
})