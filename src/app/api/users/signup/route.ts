import connect from "@/DB/dfConfig";
import User from "@/models/user.models.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

    return NextResponse.json({
      message: "User Register Successfully",
      status: 201,
      User: saveUser,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
