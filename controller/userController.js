import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userData = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    let token = jwt.sign({ id: newUser._id , email: newUser.email}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      status: true,
      message: "User regestered succesfully",
      user: { email: newUser.email, name: newUser.name, phone: newUser.phone },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.json({ status: false, message: "invalid crediantials" });
    let checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass)
      return res.json({ status: false, message: "invalid crediantials" });

    let token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    return res.json({
      status: true,
      message: "User logged in",
      user: { email: user.email, name: user.name, cartItems: user.cartItems },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

export const isAuth = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.json({ status: true, message: "Loged Out succesfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.json({ status: false, message: "Cannot find your number" });
    }
    const sendOtp = Math.floor(1000 + Math.random() * 9000);
    user.otp = sendOtp;
    user.otpCreatedAt = new Date();
    await user.save();

    return res.json({
      forgetstatus: true,
      forgetmessage: "Otp Sent",
      otp: sendOtp,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });
    if (!user || !user.otp || user.otp !== parseInt(otp)) {
      return res.json({ status: false, message: "Invalid Otp" });
    }
    const currTime = new Date();
    const otpTime = new Date(user.otpCreatedAt);
    const timePassed = currTime - otpTime;

    if (timePassed > 5 * 60 * 1000) {
      user.otp = null;
      user.otpCreatedAt = null;
      await user.save();
    }
    if (user.otp === parseInt(otp)) {
      user.otp = null;
      user.otpCreatedAt = null;
      await user.save();
    }

    return res.json({ otpStatus: true, otpMessage: "Verified" });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ phone });
    if (user) {
      user.password = hashedPassword;
      await user.save();
      return res.json({resetSuccess:true})
    }
    else return res.json({resetSuccess:true})
  } catch (error) {
    return res.json({status:false, message:"password not updated"})
  }
};
