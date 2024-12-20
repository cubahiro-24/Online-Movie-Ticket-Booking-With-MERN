import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./config/db.js";
import filmRoutes from "./routes/film.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import utilisateurRoutes from "./routes/utilisateur.route.js";

dotenv.config();

const app = express();

// Add CORS middleware
app.use(
  cors({
    origin: "*", // Add your frontend development server URL(s)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/films", filmRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
