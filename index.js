import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import "dotenv/config"
import UserRouter from "./routes/userRouute.js"
import sellerRoute from "./routes/sellerRouter.js"
import connectCloudinary from "./config/cloudinary.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import AddressRoute from "./routes/addressRoute.js"
import orderRoute from "./routes/orders.js"
let app = express()
let port = process.env.PORT || 4000
await connectDb()
await connectCloudinary()
//middleware
app.use(express.json())
app.use(
  cors({
    origin:["http://localhost:5173"], // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable cookies to be sent with requests
  })
);
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("Api Working")
})
app.use("/api/user",UserRouter)
app.use("/api/seller",sellerRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/address",AddressRoute)
app.use("/api/orders",orderRoute)



app.listen(port,()=>{
    console.log(`api is running on ${port}`)
})