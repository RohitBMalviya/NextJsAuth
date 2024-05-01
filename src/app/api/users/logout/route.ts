import connect from "@/DB/dfConfig";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    };

    const response = NextResponse.json(
      { message: "User Logout Successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", "", options);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
