import mongoose from "mongoose";

export async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error("MongoDB URI is not defined in environment variables");
      throw new Error("MongoDB URI is not defined");
    }

    await mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    console.log(error);
  }
}
