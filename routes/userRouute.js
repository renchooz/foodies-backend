import express from "express";
import {
  forgetPassword,
  isAuth,
  login,
  logout,
  resetPassword,
  userData,
  verifyOtp,
} from "../controller/userController.js";
import authUser from "../middleware/authUser.js";
const UserRouter = express.Router();

UserRouter.post("/register", userData);
UserRouter.post("/login", login);
UserRouter.get("/is-auth", authUser, isAuth);
UserRouter.post("/logout", authUser, logout);
UserRouter.post("/forget",forgetPassword)
UserRouter.post("/verify",verifyOtp)
UserRouter.post("/reset",resetPassword)


export default UserRouter;