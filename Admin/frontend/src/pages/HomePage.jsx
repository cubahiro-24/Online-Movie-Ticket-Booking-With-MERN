// import React, { useEffect } from "react";
// import SearchBar from "./../components/SearchBar";
// import { useState } from "react";
// import MovieCard from "../components/MovieCard";
// import { useFilmstore } from "../store/Movie.jsx";

// const HomePage = () => {
//   const { fetchFilms, films } = useFilmstore();
//   useEffect(() => {
//     fetchFilms();
//   }, [fetchFilms]);
//   console.log("Films", films);

//   const [searchTerm, setSearchTerm] = useState("");
//   const filteredMovies = films.filter((film) =>
//     film.titre.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div className="bg-black text-white min-h-screen p-8">
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//         {films.map((film) => (
//           <MovieCard key={film._id} film={film} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import SearchBar from "./../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useFilmstore } from "../store/Movie.jsx";

const HomePage = () => {
  const { fetchFilms, films } = useFilmstore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  // Filter films based on the search term
  const filteredMovies = films.filter((film) =>
    film.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((film) => <MovieCard key={film._id} film={film} />)
        ) : (
          <p className="text-center text-gray-400">Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
