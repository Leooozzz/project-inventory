import z from "zod";

const userTypeEnum =z.enum(["super admin","admin","user"])
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long."),
  role:userTypeEnum,
});
