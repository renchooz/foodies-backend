import express from 'express'
import { sellerisAuth, sellerLogin, sellerlogout } from '../controller/sellerController.js'
import authSeller from '../middleware/authSeller.js'
const sellerRoute = express.Router()

sellerRoute.post('/login',sellerLogin)
sellerRoute.get("/is-auth",authSeller,sellerisAuth)
sellerRoute.post("/logout",sellerlogout)

export default sellerRoute