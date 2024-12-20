import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    Annee: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    salle: {
      type: String,
      required: true,
    },
    heure_debut: {
      type: String,
      required: true,
    },
    date_proj: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, //Create at and update at
  }
);

const Film = mongoose.model("Film", filmSchema);

export default Film;
