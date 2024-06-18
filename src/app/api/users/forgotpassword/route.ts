import { connectDB } from "@/db/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "No Such users exist"}, {status : 404})
        }
        
        await sendEmail({email, emailType : "RESET", userId : user._id})

        return NextResponse.json(
            {
                message : "Password recovery email sent Successfully",
                success : true
            }
        )
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error : error.message}, {status : 500})
    }
}