import { z } from "zod";

export const loginFormSchema = z.object({
  login: z.string().min(3, "Login inválido!"),
  senha: z.string().min(4, "A senha deve ter no mínimo 8 caracteres!"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
