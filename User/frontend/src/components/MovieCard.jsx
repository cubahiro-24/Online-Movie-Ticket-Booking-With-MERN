import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const [showProjectionDate, setShowProjectionDate] = useState(false);

  return (
    <Link to={`/movie/${movie._id}`}>
      <div
        className="relative w-[400px] h-[400px] bg-cover bg-center group overflow-hidden rounded-lg cursor-pointer"
        style={{ backgroundImage: `url(${movie.photo})` }}
        onMouseEnter={() => setShowProjectionDate(true)}
        onMouseLeave={() => setShowProjectionDate(false)}
      >
        {/* Année de sortie */}
        <div className="absolute top-4 left-4 bg-black/70 px-2 py-1 rounded">
          {movie.Annee}
        </div>

        {/* Informations du film */}
        <div className="absolute bottom-0 w-full bg-black/20 p-4">
          <h2 className="text-2xl font-bold text-white">{movie.titre}</h2>
          <p className="text-gray-300">{movie.genre}</p>
        </div>

        {/* Détails du film au survol */}
        <div
          className={`absolute bottom-0 w-full bg-black/80 p-4 transition-all duration-300 
        ${showProjectionDate ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex items-center mb-2">
            <Calendar className="mr-2 text-blue-500" size={20} />
            <span>{movie.date_proj}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

// // src/components/MovieCard.jsx
// import React, { useState } from "react";
// import { Calendar } from "lucide-react";
// import { Link, useNavigate } from "react-router";

// const MovieCard = ({ movie }) => {
//   const [showProjectionDate, setShowProjectionDate] = useState(false);
//   const navigate = useNavigate();

//   const handleMovieClick = () => {
//     // navigate(`/movie/${movie.id}`);
//   };

//   return (
//     <Link to={`/movie/${movie.id}`}>
//       <div
//         className="relative w-[400px] h-[400px] bg-cover  bg-center group overflow-hidden rounded-lg cursor-pointer"
//         style={{ backgroundImage: `url(${movie.image})` }}
//         onMouseEnter={() => setShowProjectionDate(true)}
//         onMouseLeave={() => setShowProjectionDate(false)}
//       >
//         {/* Année de sortie */}
//         <div className="absolute top-4 left-4 bg-black/70 px-2 py-1 rounded">
//           {movie.year}
//         </div>

//         {/* Informations du film */}
//         <div className="absolute bottom-0 w-full bg-black/20 p-4">
//           <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
//           <p className="text-gray-300">{movie.category}</p>
//         </div>
//         {/* Détails du film au survol */}
//         <div
//           className={`absolute bottom-0 w-full bg-black/80 p-4 transition-all duration-300
//         ${showProjectionDate ? "translate-y-0" : "translate-y-full"}`}
//         >
//           <div className="flex items-center mb-2">
//             <Calendar className="mr-2 text-blue-500" size={20} />
//             <span>{movie.projectionDate}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default MovieCard;
