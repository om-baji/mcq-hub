'use server'
import { userModel } from "@/models/dbModels";
import dbConnect from "../db";
import { ApiResponse } from "../types/ApiResponse";

export async function verifyUser({username,otp} : {
    username : string;
    otp : string;
}) : Promise<ApiResponse> {
    await dbConnect();

    try {

        const user = await userModel.findOne({
            username
        })

        if(!user) return { success : false, message : "User not found!"}

        if(user?.verificationExpiry < new Date()){
            return {
                success : false,
                message : "Verification code expired!"
            }
        }

        if(user.verifyCode !== otp) {
            return {
                success : false,
                message : "Verification code does not match!"
            }
        }

        user.isVerified = true

        await user.save()

        return {
            success : true,
            message : "Verification successfull!"
        }

           
    } catch (e) {
        return {
            success : false,
            message : "Something went wrong while verfication!"
        }
    }
}