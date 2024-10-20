'use server'
import dbConnect from "../db";
import { userModel } from "@/models/dbModels";
import { usernameValidation } from "@/schemas/signUpSchema";
import { ApiResponse } from "../types/ApiResponse";

export async function checkUsername(username : string) : Promise<ApiResponse>{
    await dbConnect();

    const { success, data, error } = usernameValidation.safeParse(username);

    if(!success) {
        console.log(data,error)
        return {
        success : false,
        message : "Invalid username!" + error.toString(),
        
        }
    }
        
    try {

        const existingUsername = await userModel.find({username, isVerified : false})
        if(existingUsername) return {
            success : false,
            message : "Username already taken!"
        }

        return {
            success : true,
            message : "This is a valid and unique username!"
        }
        
    } catch (e) {
        console.log(e)
        return {
            success : false,
            message : "Something went wrong while checking username!",
        }
    }
}