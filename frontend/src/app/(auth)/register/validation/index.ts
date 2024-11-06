import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.string().email("invalid email"),
  password: z.string().min(8, "minimal 8 characters password"),
});

export type TRegister = z.infer<typeof registerSchema>;
