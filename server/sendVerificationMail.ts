import VerificationEmail from "./emails/VerificationEmail";
import { resend } from "./resend";
import { ApiResponse } from "./types/ApiResponse";
import { returnFail } from "./utilities";

export async function sendVerificationMail({
  username,
  otp,
  email
}: {
  username: string;
  otp: string;
  email : string;
}): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Om <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      react: VerificationEmail({ username, otp }),
    });

    if (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong while sending mail!",
      };
    }

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    return returnFail;
  }
}
