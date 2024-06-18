import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("user exists");

    const valisPassword = bcryptjs.compare(password, user.password);
    if (!valisPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Token secret not found" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      message: "Logged in success",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true, secure: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
