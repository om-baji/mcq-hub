import { z } from "zod";

export const postMcqSchema = z.object({
    question : z.string(),
    options : z.array(z.string())
})