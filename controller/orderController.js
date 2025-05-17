import OrderModel from "../models/order.js";
import ProductModel from "../models/Product.js";

export const myOrderCod = async (req, res) => {
  try {
    const { address, items } = req.body;
    const userId = req.userId;

    // Validate address and items
    if (!address || !items || items.length === 0) {
      return res.status(400).json({ status: false, message: "Couldn't place order: Address or items missing" });
    }

    let totalAmount = 0;

    // Calculate total amount based on items and product offer price
    for (const item of items) {
      const product = await ProductModel.findById(item.product);
      if (!product) {
        return res.status(404).json({ status: false, message: "Product not found" });
      }
      totalAmount += product.offerPrice * item.quantity;
    }

    // Add 2% service charge 
    totalAmount += Math.floor(totalAmount * 0.02);

    // Create and save the order
    await OrderModel.create({
      userId,
      address,
      items,
      amount: totalAmount,
      paymentMethod: "COD",
    });

    return res.status(201).json({ status: true, message: "Order Placed Successfully" });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


export const getUserOrder= async(req,res)=>{
try {
    const userId= req.userId
    const orders = await OrderModel.find({userId}).populate("items.product").populate("address")
    if(orders.length === 0){
        return res.json({status:false,message:"No orders found"})
    }
     return res.json({status:true,orders})
} catch (error) {
     console.log(error.message);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
}
}

export const getAllOrders = async(req,res)=>{
    try {
          const orders = await OrderModel.find({
        $or:[{paymentMethod:"COD"},{isPaid:true}]
    }).populate("items.product").populate("address")
       if(orders.length === 0){
        return res.json({status:false,message:"No orders found"})
       }
         return res.json({status:true,orders})
    } catch (error) {
        console.log(error.message);
    return res.status(500).json({ status: false, message: "Internal Server Error" });

    }
  
}
