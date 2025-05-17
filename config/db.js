import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/foodies`);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
};

export default connectDb;
