import express, { Router } from "express";
import { LoginUser } from "../controllers/loginController";

const loginRouter = Router();

loginRouter.post("/", LoginUser);

export default loginRouter;
