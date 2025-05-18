import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],  
      
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false, // Keeps empty objects in DB
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
