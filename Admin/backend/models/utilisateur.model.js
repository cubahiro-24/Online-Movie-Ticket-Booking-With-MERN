import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    gmail: {
      type: String,
      required: true,
    },
    password: {
      type: Number,
      required: true,
    },
    numero: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, //Create at and update at
  }
);

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
