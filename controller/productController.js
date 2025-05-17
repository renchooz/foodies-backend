import { json } from "express"
import { v2 as cloudinary } from "cloudinary"
import ProductModel from "../models/Product.js"




export const addProduct = async (req, res) => {
  try {
   
    if (!req.body.productData) {
      return res.status(400).json({ status: false, message: "Missing product data" });
    }

    const productData = JSON.parse(req.body.productData);

    
    const image = req.file;
    if (!image) {
      return res.status(400).json({ status: false, message: "Image file is required" });
    }

    
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    
    const newProduct = await ProductModel.create({
      ...productData,
      image: uploadResult.secure_url,
    });

    return res.status(201).json({ status: true, product: newProduct,message:"product added" });
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const productList = async (req,res)=>{
    try {
        const products =await ProductModel.find({})
        res.json({status: true, product: products})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}
export const productById = async (req,res)=>{
    try {
       const {id} = req.body
       const product = ProductModel.findById(id)
        res.json({status: true, product: product})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}
export const changeStock = async (req,res)=>{
try {
    const {id, inStock} = req.body
    await ProductModel.findByIdAndUpdate(id,{inStock})
    res.json({status: true, message:"product updated"})
} catch (error) {
    console.log(error.message)
    res.json({message:error.message})
}
}