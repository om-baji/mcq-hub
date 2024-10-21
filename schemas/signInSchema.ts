import { z } from "zod";


export const signInSchema = z.object({
  identifier: z.string().min(1, { message : "This field cannot be empty"}),
  password: z.string().min(6),
});

export type signinTypes = z.infer<typeof signInSchema>