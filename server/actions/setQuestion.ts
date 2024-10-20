'use server'
import { MCQ, mcqModel } from "@/models/dbModels";
import dbConnect from "../db";
import { ApiResponse } from "../types/ApiResponse";

export async function setQuestion({question,options} : MCQ): Promise<ApiResponse>{
    await dbConnect();

    try {
      
        const postQuestion = await mcqModel.create({
            question,
            options
        })

        if(!postQuestion) {
            return {
                success : false,
                message: "Soemthing went wromg while posting question!"
            }
        }

        return {
            success : true,
            message : "MCQ Posted successfully!"
        }
  
    } catch (e) {

        console.log(e)
        return {
            success : false,
            message: "Soemthing went wromg while posting question!"
        }
    }

}