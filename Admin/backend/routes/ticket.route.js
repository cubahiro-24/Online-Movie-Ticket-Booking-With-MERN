import express from "express";

import { createTicket,getTicketsByMovie, deleteTicket, getTickets, updateTicket, getTicketsByNameOfMovie } from "../controllers/ticket.controller.js";



const router = express.Router();

router .get("/", getTickets);

router .get("/stats", getTicketsByMovie);

router .post("/", createTicket);

router .put("/:id", updateTicket);

router .delete("/:id", deleteTicket);

router.get('/:nom_film', getTicketsByNameOfMovie);


export default router;