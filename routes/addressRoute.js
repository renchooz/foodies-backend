import express from 'express'
import { addAddress, getAddress } from '../controller/addressController.js'
import authUser from '../middleware/authUser.js'

const AddressRoute = express.Router()
AddressRoute.post("/add",authUser,addAddress)
AddressRoute.get("/get",authUser,getAddress)

export default AddressRoute