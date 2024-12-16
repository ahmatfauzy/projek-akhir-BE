import { Router } from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const bookRoutes = Router();

bookRoutes.get("/", getBooks);
bookRoutes.post("/", createBook);
bookRoutes.put("/:id", updateBook);
bookRoutes.delete("/:id", deleteBook);

export default bookRoutes;
