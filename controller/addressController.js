import addressModel from "../models/address.js"


export const addAddress = async (req, res) => {
  try {
    const { name, phone, street, city, state, country, pinCode } = req.body;

    await addressModel.create({
      userId: req.userId,
      email:req.email,
      name,
      phone,
      street,
      city,
      state,
      country,
      pinCode,
    });

    res.json({ status: true, message: "Address saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: false, message: error.message });
  }
};


export const getAddress = async(req,res)=>{
    try {
        const userId = req.userId
        const addresses = await addressModel.find({userId})
        res.json({status:true, addresses})
    } catch (error) {
        console.log(error.message)
        res.json({status:false,message:error.message}) 
    }
}