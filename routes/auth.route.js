import express, { Router } from "express";
import { login, register } from "../controllers/auth.controllers";

const router = express.Router();

Router.route("register").post(register);
Router.route("login").post(login);

export default router;
