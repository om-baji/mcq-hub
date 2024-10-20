import { z } from "zod";

export const verificationCodeSchema = z.object({
    verifyCode : z.string(),
    
})