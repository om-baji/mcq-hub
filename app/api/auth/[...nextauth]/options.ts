import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import dbConnect from "@/server/db";
import { userModel } from "@/models/dbModels";
import bcrypt from 'bcryptjs';
import { JWT } from "next-auth/jwt";

export const authOptions : AuthOptions = {
    providers : [
        CredentialsProvider({
            name : "Email",
            credentials : {
                email : { label : "Email", placeholder : "someone@gmail.com"},
                password : { label : "Password" , placeholder : "Password"}
            },
            async authorize(credentials : any) : Promise<any>{
                await dbConnect();

                try {
                    
                    const user = await userModel.findOne({
                        "$or" : [
                            { username : credentials.identifier},
                            { email : credentials.identifier }
                        ]
                    })

                    if(!user) throw new Error("User not found!")
                    
                    if(!user.isVerified) throw new Error("User not verified, register again!")

                    const isValid = await bcrypt.compare(credentials.password , user.password)

                    console.log(isValid)

                    if(isValid) return user;

                    throw new Error('Wrong password!')

                } catch (e : any) {
                    throw new Error(e)
                }
            }
        }),
        Github({
            clientId : process.env.GITHUB_ID || "",
            clientSecret : process.env.GITHUB_SECRET || ""
        })
    ],
    secret : process.env.AUTH_SECRET,
    session : { strategy : "jwt" },
    callbacks : {
        async jwt({token,user}) : Promise<JWT>{
            if(user){
                token._id = user._id,
                token.email = user.email,
                token.username = user.username
                token.name = user.name
            }
            return token
        },
        async session({session,token}) : Promise<any>{
            if(token){
                session.user = {
                    _id: token._id,
                    email: token.email,
                    name: token.name,
                    username : token.username,
                    isVerified: token.isVerified,
                  };
            }
            return session;
        }
    }
}
