import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    console.log(token);

    if (!token) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const user = await User.findOne({
      verifyToken: token,
      VerifyTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.VerifyTokenExpiration = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
