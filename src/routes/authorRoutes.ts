import {
  createAuthor,
  getAuthors,
  deleteAuthor,
  updateAuthor
} from "../controllers/authorController";
import { Router } from "express";

const authorRoutes = Router();

authorRoutes.post("/", createAuthor);
authorRoutes.get("/", getAuthors);
authorRoutes.delete("/:id", deleteAuthor);
authorRoutes.put("/:id", updateAuthor)

export default authorRoutes;
