'use server'
import { MCQ } from "@/models/dbModels";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function aiQuestion(limit: number, tag: string) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Give ${limit} MCQ question(s) on advanced, high-level, and core ${tag}. It should return an array of objects with fields for options, question, correctAnswer, and tag with the subject name matching my input. Avoid repeated questions.`;

        const result = await model.generateContent(prompt);
        let responseText = await result.response.text();

        responseText = responseText.replace(/```|json/gi, '').trim();

        const questions  = JSON.parse(responseText);

        // console.log(questions);

        return {
            success: true,
            message: "Successful fetch",
            questions
        };
    } catch (e) {
        console.error("Error parsing JSON response:", e);

        return {
            success: false,
            message: "Something went wrong!"
        };
    }
}
