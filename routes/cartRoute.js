import express from "express"
import { UpdateCart } from "../controller/cartController.js"

import authUser from "../middleware/authUser.js"

const cartRoute = express.Router()

cartRoute.post("/update",authUser,UpdateCart)

export default cartRoute