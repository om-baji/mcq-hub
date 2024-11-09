import { userModel } from "@/models/dbModels";
import dbConnect from "@/server/db";
import bcrypt from 'bcryptjs';
import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

// Define credentials structure
// interface Credentials {
//     email: string;
//     password: string;
// }

// Define User type with both `id` and `_id` fields
interface User {
    id: string;  // Required by NextAuth's User type
    _id: string;
    email: string;
    username: string;
    name: string;
    password: string;
    isVerified: boolean;
}

// Extend NextAuth Session with custom user fields
interface ExtendedSession extends Session {
    user: {
        id: string;
        _id: string;
        email: string;
        name: string;
        username: string;
        isVerified: boolean;
    };
}

// Extend JWT with custom fields
interface ExtendedJWT extends JWT {
    id: string;
    _id: string;
    email: string;
    username: string;
    name: string;
    isVerified: boolean;
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", placeholder: "someone@gmail.com", type: "email" },
                password: { label: "Password", placeholder: "Password", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) return null;

                await dbConnect();

                const user = await userModel.findOne({
                    $or: [
                        { username: credentials.email },
                        { email: credentials.email }
                    ]
                }) as User | null;

                if (!user || !user.isVerified) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                return isValid ? { ...user, id: user._id } : null;
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }): Promise<ExtendedJWT> {
            if (user) {
                token = {
                    ...token,
                    id: user.id,
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    isVerified: user.isVerified
                };
            }
            return token as ExtendedJWT;
        },
        async session({ session, token }): Promise<ExtendedSession> {
            session.user = {
                // id: token.id as string,
                _id: token._id as string,
                email: token.email as string,
                name: token.name as string,
                username: token.username as string,
                isVerified: token.isVerified as boolean
            };
            return session as ExtendedSession;
        }
    }
};
