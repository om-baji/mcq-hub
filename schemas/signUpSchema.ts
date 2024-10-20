import { z } from "zod";

export const usernameValidation = z
  .string()
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Only letters, numbers, and underscores are allowed",
  })
  .min(3)
  .max(20);

export const signUpSchema = z.object({
  username: usernameValidation,
  name : z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type signUpTypes = z.infer<typeof signUpSchema>