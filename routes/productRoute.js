import express from "express"
import { upload } from "../config/multer.js"
import authSeller from "../middleware/authSeller.js"
import { addProduct, changeStock, productById, productList } from "../controller/productController.js"

const productRoute = express.Router()
productRoute.post("/add",authSeller,upload.single("image"),addProduct)
productRoute.get("/list",productList)
productRoute.get("/:id",productById)
productRoute.post("/stock",authSeller,changeStock)

export default productRoute 