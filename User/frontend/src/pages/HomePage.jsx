import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/films");
        console.log(response.data);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // const filteredMovies = movies.filter((movie) =>
  //   movie.titre.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Fetch filtered movies when search term changes
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(`http://localhost:5000/api/films/search/${searchTerm}`);
          setMovies(response.data);
        } catch (err) {
          setError("Failed to fetch movies");
        }
      } else {
        // If search term is empty, refetch all movies
        fetchMovies();
      }
    };

    fetchFilteredMovies();
  }, [searchTerm]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-center text-5xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
        Buja Box Office
      </h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid space-x-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {movies.data.length > 0 ? (
          movies.data.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <div>Please Refresh</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

// // src/pages/HomePage.jsx
// import React, { useState } from "react";
// import { MOVIES } from "../constants/movies";
// import SearchBar from "../components/SearchBar";
// import MovieCard from "../components/MovieCard";

// const HomePage = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredMovies = MOVIES.filter((movie) =>
//     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-black text-white min-h-screen p-8">
//       {/* Titre avec dégradé bleu */}
//       <h1 className="text-center text-5xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
//         Buja Box Office
//       </h1>

//       {/* Barre de recherche */}
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//       {/* Grille de films */}
//       <div className="grid space-x-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//         {MOVIES.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
