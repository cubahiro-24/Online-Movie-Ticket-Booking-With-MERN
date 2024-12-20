import express from "express";

import {
  getFilms,
  createFilm,
  updateFilm,
  deleteFilm,
  getFilmsByID,
} from "../controllers/film.controller.js";

const router = express.Router();

router.get("/", getFilms);

router.get("/:id", getFilmsByID);

router.post("/", createFilm);

router.put("/:id", updateFilm);

router.delete("/:id", deleteFilm);

export default router;
