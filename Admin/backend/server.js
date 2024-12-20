// const express= require ('express');
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import filmRoutes from "./routes/film.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import utilisateurRoutes from "./routes/utilisateur.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/films", filmRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost: " + PORT);
});
