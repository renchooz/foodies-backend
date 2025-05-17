import User from "../models/userModel.js"

export const UpdateCart = async (req,res)=>{
  try {
    const {userId,cartItems} = req.body
    await User.findByIdAndUpdate(userId,{cartItems})
   res.json({status: true, message:"cart updated"})
  } catch (error) {
    console.log(error.message)
    res.json({message:error.message})
  }
}