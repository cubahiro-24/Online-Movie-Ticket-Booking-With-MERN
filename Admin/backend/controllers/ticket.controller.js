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

export const getTicketsByMovie = async (req, res) => {
  try {
    const ticketStats = await Ticket.aggregate([
      // Grouper par nom de film
      {
        $group: {
          _id: "$nom_film",
          nombre_tickets: { $sum: 1 },
          revenu_total: { $sum: "$prix" }, // Calculer aussi le revenu total si souhaité
        },
      },
      // Trier par nombre de tickets (décroissant)
      {
        $sort: { nombre_tickets: -1 },
      },
      // Reformater la sortie
      {
        $project: {
          nom_film: "$_id",
          nombre_tickets: 1,
          revenu_total: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      success: true,
      data: ticketStats,
      total_films: ticketStats.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des statistiques",
      error: error.message,
    });
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

export const getTicketsByNameOfMovie = async (req, res) => {
  const { nom_film } = req.params; // Récupérer le nom du film depuis les paramètres de la requête

  try {
    const ticketStats = await Ticket.aggregate([
      // Filtrer par nom de film
      {
        $match: {
          nom_film: nom_film, // Filtrer par le nom du film spécifié
        },
      },
      // Grouper par nom de film
      {
        $group: {
          _id: "$nom_film",
          nombre_tickets: { $sum: 1 },
          revenu_total: { $sum: "$prix" }, // Calculer aussi le revenu total
        },
      },
      // Reformater la sortie
      {
        $project: {
          nom_film: "$_id",
          nombre_tickets: 1,
          revenu_total: 1,
          _id: 0,
        },
      },
    ]);

    // Vérifier si des tickets ont été trouvés pour le film
    if (ticketStats.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun ticket trouvé pour le film spécifié.",
      });
    }

    res.json({
      success: true,
      data: ticketStats[0], // Retourner le premier élément (statistiques du film)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des statistiques",
      error: error.message,
    });
  }
};
