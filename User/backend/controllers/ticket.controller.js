import mongoose from "mongoose";
import Ticket from "../models/ticket.model.js";

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    console.error("Error in fetching tickets", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTicket = async (req, res) => {
  const ticket = req.body; //user will send this data

  if (
    !ticket.nom ||
    !ticket.gmail ||
    !ticket.prix ||
    !ticket.moyen_paiement ||
    !ticket.nom_film
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newTicket = new Ticket(ticket);

  try {
    await newTicket.save();
    res.status(201).json({ success: true, data: newTicket });
  } catch (error) {
    console.error("Error in creating ticket", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const ticket = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid ticket id" });
  }

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticket, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid ticket id" });
  }

  try {
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Ticket deleted" });
  } catch (error) {
    console.error("Error in deleting ticket", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
