import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import "dotenv/config";
import UserRouter from "./routes/userRouute.js";
import sellerRoute from "./routes/sellerRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import AddressRoute from "./routes/addressRoute.js";
import orderRoute from "./routes/orders.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect DB and Cloudinary
await connectDb();
await connectCloudinary();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://melodious-marigold-cac143.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.options('*', cors()); // 🔥 Handles preflight (important!)

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/user", UserRouter);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/address", AddressRoute);
app.use("/api/orders", orderRoute);

// Start Server
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
