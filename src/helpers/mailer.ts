import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4982afc38c4143",
    pass: "bc3dc4dc3b345e",
  },
});

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          VerifyTokenExpiration: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiration: Date.now() + 3600000,
        },
      });
    }

    const mailOptions = {
      from: "arnab@arnab.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to Verify your email or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
          : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`,
    };

    const mailReponse = await transporter.sendMail(mailOptions);
    return mailReponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
