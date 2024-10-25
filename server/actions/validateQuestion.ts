'use server'
import dbConnect from "../db";
import { mcqModel } from "@/models/dbModels";
import mongoose from "mongoose";
import { ApiResponse } from "../types/ApiResponse";

export async function validate(id : string, correctAnswer : string) : Promise<ApiResponse> {

    dbConnect();

    try {

        const _id = new mongoose.Types.ObjectId(id);

        const question = await mcqModel.findOne({
            _id
        })

        if(!question) throw new Error("Question not found!");

        if(question.correctAnswer === correctAnswer){
            return {
                success : true,
                message : "Correct!"
            }
        }
        return {
            success : false,
            message : "Incorrect!"
        }
    } catch (e) {

        console.log(e)

        return {
            success : false,
            message : "Something went wrong!"
        }
    }

    
}