import express from "express";

import { createTicket, deleteTicket, getTickets, updateTicket } from "../controllers/ticket.controller.js";



const router = express.Router();

router .get("/", getTickets);

router .post("/", createTicket);

router .put("/:id", updateTicket);

router .delete("/:id", deleteTicket);


export default router;