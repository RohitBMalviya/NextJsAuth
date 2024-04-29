import User from "@/models/user.models";
import { verify } from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordExpiryDate: Date.now() + 360000,
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3ab131985af4b0",
        pass: "9610e47c047e92",
      },
    });
    const mailOptions = {
      from: "abc@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
      text: "",
      html: `<a href="${process.env.DOMAIN}/verify?token=${hashToken}">here</a>
      <br>
      <p>${process.env.DOMAIN}/verify?token=${hashToken}</p>
      <br>
      <b>Hello world?</b>`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
