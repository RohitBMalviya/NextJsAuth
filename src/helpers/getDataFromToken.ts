import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodeToken: any = jwt.verify(token, process.env.TOKENSECRET!);

    return decodeToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
