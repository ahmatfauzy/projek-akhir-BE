import { Router } from "express";
import {
  createGenre,
  getGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";

const genreRoutes = Router();

genreRoutes.post("/", createGenre);
genreRoutes.get("/", getGenre);
genreRoutes.put("/", updateGenre);
genreRoutes.delete("/", deleteGenre);

export default genreRoutes;
