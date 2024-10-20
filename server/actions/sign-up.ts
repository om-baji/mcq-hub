"use server";
import dbConnect from "../db";
import { userModel } from "@/models/dbModels";
import bcrypt from "bcryptjs";
import { signUpTypes } from "@/schemas/signUpSchema";
import { ApiResponse } from "../types/ApiResponse";
import { sendVerificationMail } from "../sendVerificationMail";

export async function signup({
  username,
  email,
  password,
}: signUpTypes): Promise<ApiResponse> {
  await dbConnect();

  try {
    const existingUserVerified = await userModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerified) {
      return {
        success: false,
        message: "username exists and already verified",
      };
    }

    const userExistsByEmail = await userModel.findOne({
      email,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (userExistsByEmail) {
      if (userExistsByEmail.isVerified) {
        return {
          success: false,
          message: "Email already exists and is verified!",
        };
      }

      const hashPass = await bcrypt.hash(password, 10);
      const verificationExpiry = new Date();
      verificationExpiry.setHours(verificationExpiry.getHours() + 1);

      userExistsByEmail.password = hashPass;
      userExistsByEmail.verifyCode = verifyCode;
      userExistsByEmail.verificationExpiry = verificationExpiry;

      await userExistsByEmail.save();
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const verificationExpiry = new Date();
      verificationExpiry.setHours(verificationExpiry.getHours() + 1);
      const newUser = await userModel.create({
        username,
        email,
        password: hashPass,
        verifyCode,
        verificationExpiry,
      });

      console.log(newUser)

      await newUser.save();
    }

    const sendMail = await sendVerificationMail({
      username,
      otp: verifyCode,
      email,
    });

    if (!sendMail.success) {
      return {
        success: false,
        message: sendMail.message,
      };
    }

    return {
      success: true,
      message: "Verification mail sent, please verify in 1 hour!",
      username
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error while signing up!",
    };
  }
}
