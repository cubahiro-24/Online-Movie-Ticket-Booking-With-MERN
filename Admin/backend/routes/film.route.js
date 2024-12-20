import express from "express";

import { getFilms,getFilmById, createFilm, updateFilm, deleteFilm } from "../controllers/film.controller.js";



const router = express.Router();

router .get("/", getFilms);

router .get("/:id", getFilmById);

router .post("/", createFilm);

router .put("/:id", updateFilm);

router .delete("/:id", deleteFilm);


export default router;