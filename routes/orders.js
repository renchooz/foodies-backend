import express from "express"
import authUser from "../middleware/authUser.js"
import { getAllOrders, getUserOrder, myOrderCod } from "../controller/orderController.js"
import authSeller from "../middleware/authSeller.js"
 let orderRoute = express.Router()

 orderRoute.post("/cod",authUser,myOrderCod)
 orderRoute.get("/user",authUser,getUserOrder)
 orderRoute.get("/admin",authSeller,getAllOrders)

export default orderRoute