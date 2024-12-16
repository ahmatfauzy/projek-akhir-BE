import { Router } from "express";
import { getBooks } from "../controllers/bookController";

const bookRoutes = Router();

bookRoutes.get("/", getBooks);

export default bookRoutes;
