import connect from "@/DB/dfConfig";
import User from "@/models/user.models.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKENSECRET!, {
      expiresIn: "1d",
    });
    const options = {
      httpOnly: true,
      secure: true,
      expires:new Date(0)
    };
    const response = NextResponse.json(
      {
        message: "User Login Successfully",
        status: 200,
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, options);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
