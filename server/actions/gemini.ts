'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function aiQuestion(limit : number, tag : string) {
    try {

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDtxGbPOnYA7FzlvRbD3S7sdu2f5SeU3MA")
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const promt = `Give ${limit.toString()} mcq question(s) on advanced, high level and core ${tag}, it should return an array of a objects with an options array and question and also a correctAnswer field and a tag field with subject name(This subject name should be same as i have given), questions should not be repeated`;

        const result = await model.generateContent(promt);

        const questions = JSON.parse(result.response.text().replaceAll('```','').replace('json',''))

        // console.log(questions)

        return {
            success : true,
            message : "Succesfull fetch",
            questions
        }
        
        
    } catch (e) {

        console.log(e)

        return {
            success : false,
            message : "Something went wrong!"
        }
    }
}