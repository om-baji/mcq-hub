import { z } from "zod";


export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6),
});

export type signinTypes = z.infer<typeof signInSchema>