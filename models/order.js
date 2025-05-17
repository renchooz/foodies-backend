import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{type:String, required:true, ref:"User"},
    items:[{
        product:{
            type:String,
            required:true,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    amount:{type:Number,required:true},
    address:{type:String,required:true,ref:"address"},
    isPaid:{type:Boolean,required:true,default:false},
    paymentMethod:{type:String,required:true},
    status:{type:String,required:true,default:"Pending"}

},{timestamps:true})

const OrderModel =mongoose.models.order || mongoose.model("order",OrderSchema)
export default OrderModel