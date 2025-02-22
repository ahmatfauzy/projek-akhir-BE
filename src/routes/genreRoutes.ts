import { Router } from "express";
import {
  createGenre,
  getGenre,
  updateGenre,
  deleteGenre
} from "../controllers/genreController";

const genreRoutes = Router();

genreRoutes.post("/", createGenre);
genreRoutes.get("/", getGenre);
genreRoutes.put("/:id", updateGenre);
genreRoutes.delete("/:id", deleteGenre);

export default genreRoutes;
