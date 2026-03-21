import { z } from "zod";

export const createUserSchema = z
  .object({
    avatar: z.any().optional(),

    name: z
      .string()
      .min(2, "Nome obrigatório")
      .optional()
      .or(z.literal("")),

    email: z
      .string()
      .email("Email inválido")
      .optional()
      .or(z.literal("")),

    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .optional()
      .or(z.literal("")),

    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) return true;
      if (data.password && !data.confirmPassword) return false;
      return data.password === data.confirmPassword;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  );
export type userFormDataEdit = z.infer<typeof createUserSchema>;