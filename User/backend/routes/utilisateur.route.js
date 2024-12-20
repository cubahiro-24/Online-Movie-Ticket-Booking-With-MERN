import express from "express";
import { createUtilisateur, deleteUtilisateur, getUtilisateurs, updateUtilisateur } from "../controllers/utilisateur.controller.js";


const router = express.Router();

router .get("/", getUtilisateurs);

router .post("/", createUtilisateur);

router .put("/:id", updateUtilisateur);

router .delete("/:id", deleteUtilisateur);


export default router;