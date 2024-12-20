import mongoose from "mongoose";
import Utilisateur from "../models/utilisateur.model.js";

export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({});
    res.status(200).json({ success: true, data: utilisateurs });
  } catch (error) {
    console.error("Error in fetching utilisateurs", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUtilisateur = async (req, res) => {
  const utilisateur = req.body; //user will send this data

  if (
    !utilisateur.nom ||
    !utilisateur.prenom ||
    !utilisateur.gmail ||
    !utilisateur.password ||
    !utilisateur.numero
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newUtilisateur = new Utilisateur(utilisateur);

  try {
    await newUtilisateur.save();
    res.status(201).json({ success: true, data: newUtilisateur });
  } catch (error) {
    console.error("Error in creating utilisateur", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUtilisateur = async (req, res) => {
  const { id } = req.params;
  const utilisateur = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid utilisateur id" });
  }

  try {
    const updatedUtilisateur = await Utilisateur.findByIdAndUpdate(
      id,
      utilisateur,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedUtilisateur });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteUtilisateur = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid utilisateur id" });
  }

  try {
    await Utilisateur.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Utilisateur deleted" });
  } catch (error) {
    console.error("Error in deleting utilisateur", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUtilisateur = async (req, res) => {
  const { gmail, password } = req.body; // User sends these credentials

  // Ensure both fields are provided
  if (!gmail || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide gmail and password" });
  }

  try {
    // Find the user by email
    const utilisateur = await Utilisateur.findOne({ gmail });

    // Check if the user exists
    if (!utilisateur) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur not found" });
    }

    // Convert password to number for comparison since it's stored as Number in schema
    const passwordNumber = Number(password);

    // Check if password conversion is valid
    if (isNaN(passwordNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid password format",
      });
    }

    // Validate the password
    if (utilisateur.password !== passwordNumber) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: utilisateur,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
