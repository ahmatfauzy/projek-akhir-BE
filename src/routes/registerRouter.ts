import express, { Router } from "express";
import { registerUser } from "../controllers/registerController";
import { deleteUser } from "../controllers/delete";
import { getAllUsers } from "../controllers/getAllUser";

const registerRouter = Router();

registerRouter.post("/", registerUser);
registerRouter.delete("/delete/:id", deleteUser);
registerRouter.get("/get", getAllUsers);

export default registerRouter;
