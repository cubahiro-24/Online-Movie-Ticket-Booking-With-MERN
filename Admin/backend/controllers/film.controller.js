import mongoose from "mongoose";
import Film from "../models/film.model.js";

export const getFilms = async (req, res) => {
  try {
    const films = await Film.find({});
    res.status(200).json({ success: true, data: films });
  } catch (error) {
    console.error("Error in fetching films", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du film depuis les paramètres de la requête
    const film = await Film.findById(id); // Chercher le film par ID

    if (!film) {
      return res.status(404).json({ success: false, message: "Film not found" });
    }

    res.status(200).json({ success: true, data: film });
  } catch (error) {
    console.error("Error in fetching film by ID", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createFilm = async (req, res) => {
  const film = req.body; //user will send this data

  if (
    !film.titre ||
    !film.duree ||
    !film.genre ||
    !film.description ||
    !film.Annee ||
    !film.photo ||
    !film.prix ||
    !film.salle ||
    !film.heure_debut ||
    !film.date_proj
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newFilm = new Film(film);

  try {
    await newFilm.save();
    res.status(201).json({ success: true, data: newFilm });
  } catch (error) {
    console.error("Error in creating film", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateFilm = async (req, res) => {
  const { id } = req.params;
  const film = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid film id" });
  }

  try {
    const updatedFilm = await Film.findByIdAndUpdate(id, film, { new: true });
    res.status(200).json({ success: true, data: updatedFilm });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteFilm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid film id" });
  }

  try {
    await Film.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Film deleted" });
  } catch (error) {
    console.error("Error in deleting film", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
