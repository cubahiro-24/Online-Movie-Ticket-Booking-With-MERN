import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router";
import { Home } from "lucide-react";
import PaymentForm from "../components/PaymentForm";

const MovieDetailPage = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/films/${id}`
        );
        console.log(response.data);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleTicketCreated = (ticketData) => {
    console.log("Ticket created callback:", ticketData);
    // setShowPaymentForm(false);
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!movie)
    return <div className="text-white text-center">No movie found</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      <Link className="flex items-center justify-center mb-8 gap-4" to="/">
        <Home className="mr-2 text-blue-500" />
        <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
          Buja Box Office
        </h1>
      </Link>

      <img
        src={movie.data.photo}
        alt={movie.data.titre}
        className="w-full max-w-2xl mb-8 rounded-lg shadow-2xl"
      />

      <div className="max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">
          {movie.data.titre}
        </h1>
        <p className="text-gray-300">{movie.data.description}</p>

        <div className="mt-4 text-gray-300">
          <p>Genre: {movie.data.genre}</p>
          <p>Duration: {movie.data.duree} minutes</p>
          <p>Year: {movie.data.Annee}</p>
          <p>Screening Room: {movie.data.salle}</p>
          <p>Start Time: {movie.data.heure_debut}</p>
        </div>
      </div>

      <button
        onClick={() => setShowPaymentForm(!showPaymentForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 mb-8"
      >
        Buy Ticket for {movie.data.prix} $
      </button>

      {showPaymentForm && (
        <PaymentForm movie={movie} onTicketCreated={handleTicketCreated} />
      )}
    </div>
  );
};

export default MovieDetailPage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import { Link } from "react-router";
// import { Home } from "lucide-react";
// import PaymentForm from "../components/PaymentForm";

// const MovieDetailPage = () => {
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/films/${id}`
//         );
//         console.log(response.data);
//         setMovie(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch movie details");
//         setLoading(false);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   if (loading) return <div className="text-white text-center">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center">{error}</div>;
//   if (!movie)
//     return <div className="text-white text-center">No movie found</div>;

//   return (
//     <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
//       <Link className="flex items-center justify-center mb-8 gap-4" to="/">
//         <Home className="mr-2 text-blue-500" />
//         <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
//           Buja Box Office
//         </h1>
//       </Link>

//       <img
//         src={movie.data.photo}
//         alt={movie.data.titre}
//         className="w-full max-w-2xl mb-8 rounded-lg shadow-2xl"
//       />

//       <div className="max-w-2xl text-center mb-8">
//         <h1 className="text-4xl font-bold mb-4 text-blue-500">
//           {movie.data.titre}
//         </h1>
//         <p className="text-gray-300">{movie.data.description}</p>

//         <div className="mt-4 text-gray-300">
//           <p>Genre: {movie.data.genre}</p>
//           <p>Duration: {movie.data.duree} minutes</p>
//           <p>Year: {movie.data.Annee}</p>
//           <p>Screening Room: {movie.data.salle}</p>
//           <p>Start Time: {movie.data.heure_debut}</p>
//         </div>
//       </div>

//       <button
//         onClick={() => setShowPaymentForm(!showPaymentForm)}
//         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 mb-8"
//       >
//         Buy Ticket for {movie.data.prix} $
//       </button>

//       {showPaymentForm && <PaymentForm />}
//     </div>
//   );
// };

// export default MovieDetailPage;
