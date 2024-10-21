'use server'
import dbConnect from "../db";
import { mcqModel } from "@/models/dbModels";
import { ApiResponse } from "../types/ApiResponse";

export async function getQuestion(tag : string, limit : Number){
    await dbConnect();

    try {
        
        const question = await mcqModel.aggregate([
            { $match : {
                 tag
            }},
            {
                $limit : limit as number
            }
        ])

        if(!question) throw new Error("Error while fetching!")
        
        console.log(question)

        const questions = JSON.parse(JSON.stringify(question));

        return {
            success : true,
            message : "Successfully fetched questions",
            questions
        }

        
        

    } catch (e) {
        return {
            success : false,
            message : "Failed to retrieve questions!"
        }
    }
}