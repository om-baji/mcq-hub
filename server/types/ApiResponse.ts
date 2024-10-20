import { User } from "@/models/dbModels";

export type ApiResponse = {
    success : boolean;
    message : string;
    username? : string;   
}