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
    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    return res.json({
      status:true,
      message: "User regestered succesfully",
      user: { email: newUser.email, name: newUser.name, phone:newUser.phone},
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

    let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
       sameSite: 'None'
    });
    return res.json({
      status:true,
      message: "User logged in",
      user: { email: user.email, name: user.name, cartItems : user.cartItems},
      
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
       sameSite: 'None'
    });
    res.json({ status: true, message: "Loged Out succesfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};


 export const forgetPassword = async (req,res)=>{
try {
  console.log(req.body)
  const {phone} = req.body
  const verifyNumber = await User.findOne({phone})
  if(!verifyNumber){
    return res.json({status:false,message:"Cannot find your number",user:verifyNumber})
  }
   return res.json({forgetstatus:true,message:"Otp Sent"})
} catch (error) {
     return res.json({status:false,message:error.message})
}
}