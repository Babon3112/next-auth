import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "userName already exists"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email address"],
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  VerifyTokenExpiration: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
