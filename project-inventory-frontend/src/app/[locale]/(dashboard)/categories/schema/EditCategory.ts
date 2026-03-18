import z from "zod";

export const categoryEditSchema = z.object({
    name:z.string().min(2)
})
export type categoryEditFormData= z.infer<typeof categoryEditSchema>;