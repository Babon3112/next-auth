import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { oldPassword, newPassword } = reqBody;

    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const valisPassword = await bcryptjs.compare(oldPassword, user.password);
    if (!valisPassword) {
      return NextResponse.json(
        { error: "current password does not match" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
