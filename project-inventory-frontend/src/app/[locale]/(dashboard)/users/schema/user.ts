import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], 
  });

export type userFormData = z.infer<typeof createUserSchema>;