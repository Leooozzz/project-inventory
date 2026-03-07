import z from "zod";

export const updateUserSchema = z.object({
    name:z.string().min(2,"Name is required").max(255).optional(),
    email:z.email("Invalid email format").optional(),
    password:z.string().min(8,"The password must be at least 8 characters long.").optional(),
    avatar:z.string().optional()
})