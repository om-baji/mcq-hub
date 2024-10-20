"use server";
import dbConnect from "../db";
import { userModel } from "@/models/dbModels";
import { returnFail } from "../utilities";
import { signinTypes } from "@/schemas/signInSchema";
import bcrypt from "bcryptjs";

export async function signin(data: signinTypes) {
  await dbConnect();

  try {
    const { identifier, password } = data;

    const user = await userModel.findOne({
        username : identifier,
    })

    if(!user) return returnFail;

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
      return {
        success : false,
        message : "Wrong password!"
      }
    }

    if(!user.isVerified && user.verificationExpiry < new Date()) {
        return {
            success : false,
            message : "You are not verified, please register again"
        }
    } else if(user.verificationExpiry > new Date()){

    }


  } catch (e) {
    console.log(e);

    return returnFail;
  }
}
