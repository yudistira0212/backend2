import express from "express";
import { login, logOut, me } from "../controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.get("/me", me);
AuthRoute.post("/login", login);
AuthRoute.delete("/logout", logOut);

export default AuthRoute;
