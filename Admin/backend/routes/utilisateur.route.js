import express from "express";
import { createUtilisateur, deleteUtilisateur, getUtilisateurs, updateUtilisateur,loginUtilisateur } from "../controllers/utilisateur.controller.js";


const router = express.Router();

router .get("/", getUtilisateurs);

router .post("/", createUtilisateur);

router .put("/:id", updateUtilisateur);

router .delete("/:id", deleteUtilisateur);

router.post("/login", loginUtilisateur);



export default router;