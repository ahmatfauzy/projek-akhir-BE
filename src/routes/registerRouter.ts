import express, { Router } from "express";
import { registerUser } from "../controllers/registerController";

const registerRouter = Router();

registerRouter.post("/", registerUser)

export default registerRouter