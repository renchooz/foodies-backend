import express from "express";
import {
  isAuth,
  login,
  logout,
  userData,
} from "../controller/userController.js";
import authUser from "../middleware/authUser.js";
const UserRouter = express.Router();

UserRouter.post("/register", userData);
UserRouter.post("/login", login);
UserRouter.get("/is-auth", authUser, isAuth);
UserRouter.post("/logout", authUser, logout);

export default UserRouter;