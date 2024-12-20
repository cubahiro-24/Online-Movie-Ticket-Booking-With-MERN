// src/constants/movies.js
import image1 from "../images/interstellar.png";
import image2 from "../images/inception.png";

export const MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    category: "Science-fiction",
    image: image1,
    projectionDate: "15 Décembre 2024",
    summary:
      "Un voyage épique à travers l'espace et le temps à la recherche d'un nouveau foyer pour l'humanité.",
    poster: "/api/placeholder/800/600",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    category: "Science-fiction",
    image: image2,
    projectionDate: "22 Décembre 2024",
    summary: "Un voleur de secrets capable de s'infiltrer dans les rêves.",
    poster: "/api/placeholder/800/600",
  },
];
