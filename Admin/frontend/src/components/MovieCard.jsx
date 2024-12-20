// import React, { useEffect, useState } from "react";
// import { Calendar, Edit, Trash, X } from "lucide-react";
// import { useNavigate, Link } from "react-router";
// import { useFilmstore } from "../store/Movie";

// const MovieCard = ({ film }) => {
//   const [showProjectionDate, setShowProjectionDate] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleMovieClick = () => {
//     navigate(`/film/${film._id}`);
//   };
//   const handleEditClick = () => {
//     setIsEditModalOpen(true);
//   };
//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//   };
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     //implent the logic
//     setIsEditModalOpen(false);
//   };

//   const { deleteFilm } = useFilmstore();
//   const handleDeleteFilm = async (fid) => {
//     const { success, message } = await deleteFilm(fid);
//     if (!success) {
//       console.log(message);
//     } else {
//       console.log(message);
//     }
//   };

//   return (
//     <div
//       className="relative w-[400px] h-[400px] bg-cover bg-center group overflow-hidden rounded-lg cursor-pointer"
//       style={{ backgroundImage: `url(${film.photo})` }}
//       //   style={{ backgroundImage: "url(" + film.photo + ")" }}
//       //   style={{ background: `url(${film.photo})` }}
//       onMouseEnter={() => setShowProjectionDate(true)}
//       onMouseLeave={() => setShowProjectionDate(false)}
//     >
//       {/* Année de sortie */}
//       <div className="absolute top-4 left-4 bg-black/70 px-2 py-1 rounded">
//         {film.Annee}
//       </div>

//       <div className="relative"></div>

//       <div
//         className={`absolute bottom-0 w-full bg-black/60 p-4 transition-all duration-300
//              ${showProjectionDate ? "translate-y-50" : "translate-y-full"}`}
//       >
//         <div className="relative">
//           <div className="absolute bottom-10 right-0 flex items-center bg-black/50 p-2 rounded-bl-lg">
//             <Calendar className="mr-1 text-blue-500" size={20} />
//             <span className="text-white text-sm font-bold">
//               {film.date_proj}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Informations du film */}
//       <div className="absolute bottom-0 w-full bg-black/70 p-4">
//         <h2 className="text-2xl font-bold text-white">{film.titre}</h2>
//         <p className="text-gray-300">{film.genre}</p>

//         <div className="mt-4 flex justify-start space-x-4">
//           <button
//             className="flex items-center text-gray-300 hover:text-blue-400 transition"
//             onClick={handleEditClick}
//           >
//             <Link to="/modal">
//               <Edit size={20} className="mr-1" />
//             </Link>
//           </button>

//           <button
//             className="flex items-center text-gray-300 hover:text-red-400 transition"
//             onClick={() => handleDeleteFilm(film._id)}
//           >
//             <Trash size={20} className="mr-1" />
//           </button>

//           {/* <UpdateMovie
//                       isOpen={isEditModalOpen}
//                       onClose={handleCloseEditModal}
//                       onSubmit={handleFormSubmit}
//                   /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import React, { useEffect, useState } from "react";
import { Calendar, Edit, Trash, X, Save } from "lucide-react";
import { useNavigate } from "react-router";
import { useFilmstore } from "../store/Movie";
import { useTicketStore } from "../store/TicketStore";

const MovieCard = ({ film }) => {
  const [updatedFilm, setUpdatedFilm] = useState(film); // État pour le film à modifier
  const [showDetails, setDetailsFilm] = useState(film);
  const [showProjectionDate, setShowProjectionDate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch ticket statistics from the TicketStore
  const { fetchTicketStats, ticketStats } = useTicketStore();

  const handleMovieClick = () => {
    navigate(`/film/${film._id}`);
  };

  const handleDetailsMovie = async () => {
    setDetailsFilm(film);
    await fetchTicketStats(film.titre);
    setIsDetailModalOpen(true);
  };
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleEditClick = () => {
    setUpdatedFilm(film); // Remplir le formulaire avec les données du film
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // const [updatedFilm,setUpdatedFilm]=useState(film);
  //   const {updateFilm}=useFilmstore();
  //   const handleUpdateFilm=async (pid,updatedFilm)=>{
  //       await updateFilm(pid,updatedFilm);
  //       onclose();
  //   }

  const { updateFilm } = useFilmstore();
  // const handleFormSubmit = async (pid, updatedFilm) => {
  //   // event.preventDefault();
  //   const { success, message } = await updateFilm(pid, updatedFilm); // Appeler la fonction pour mettre à jour le film
  //   setIsEditModalOpen(false); // Fermer le modal après la mise à jour
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    const { success, message } = await updateFilm(film._id, updatedFilm); // Appeler la fonction pour mettre à jour le film
    setIsEditModalOpen(false); // Fermer le modal après la mise à jour
  };

  const { deleteFilm } = useFilmstore();
  const handleDeleteFilm = async (fid) => {
    const { success, message } = await deleteFilm(fid);
    if (!success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };

  return (
    <div
      className="relative w-[400px] h-[400px] bg-cover bg-center group overflow-hidden rounded-lg cursor-pointer"
      // style={{ backgroundImage: `url(${film.photo})` }}
      // onMouseEnter={() => setShowProjectionDate(true)}
      // onMouseLeave={() => setShowProjectionDate(false)}
      // onClick={handleDetailsMovie}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${film.photo})` }}
        onClick={handleDetailsMovie}
      />
      {/* Année de sortie */}
      <div className="absolute top-4 left-4 bg-black/70 px-2 py-1 rounded">
        {film.Annee}
      </div>

      <div className="relative"></div>

      <div
        className={`absolute bottom-0 w-full bg-black/60 p-4 transition-all duration-300 
             ${showProjectionDate ? "translate-y-50" : "translate-y-full"}`}
      >
        <div className="relative">
          <div className="absolute bottom-10 right-0 flex items-center bg-black/50 p-2 rounded-bl-lg">
            <Calendar className="mr-1 text-blue-500" size={20} />
            <span className="text-white text-sm font-bold">
              {film.date_proj}
            </span>
          </div>
        </div>
      </div>

      {/* Informations du film */}
      <div className="absolute bottom-0 w-full bg-black/70 p-4">
        <h2 className="text-2xl font-bold text-white">{film.titre}</h2>
        <p className="text-gray-300">{film.genre}</p>

        <div className="mt-4 flex justify-start space-x-4">
          <button
            className="flex items-center text-gray-300 hover:text-blue-400 transition"
            onClick={handleEditClick}
          >
            <Edit size={20} className="mr-1" />
          </button>

          <button
            className="flex items-center text-gray-300 hover:text-red-400 transition"
            onClick={() => handleDeleteFilm(film._id)}
          >
            <Trash size={20} className="mr-1" />
          </button>
        </div>
      </div>

      {/* Modal de modification */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form className="max-w-2xl bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Modification
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Champ de téléchargement d'affiche */}
              <div>
                <label className="block text-gray-300 mb-2">
                  URL de l'image
                </label>
                <input
                  type="text"
                  name="photo"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.photo}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, photo: e.target.value })
                  }
                />
              </div>

              {/* Champs de formulaire */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Titre du film
                </label>
                <input
                  type="text"
                  name="titre"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.titre}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, titre: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Année de sortie
                </label>
                <input
                  type="number"
                  name="Annee"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.Annee}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, Annee: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Catégorie</label>
                <input
                  type="text"
                  name="genre"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.genre}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, genre: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Date de projection
                </label>
                <input
                  type="date"
                  name="date_proj"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.date_proj}
                  onChange={(e) =>
                    setUpdatedFilm({
                      ...updatedFilm,
                      date_proj: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Durée (en mins)
                </label>
                <input
                  type="number"
                  name="duree"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.duree}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, duree: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Heure de début
                </label>
                <input
                  type="string"
                  name="heure_debut"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.heure_debut}
                  onChange={(e) =>
                    setUpdatedFilm({
                      ...updatedFilm,
                      heure_debut: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Prix</label>
                <input
                  type="number"
                  name="prix"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.prix}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, prix: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Salle</label>
                <select
                  name="salle"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={updatedFilm.salle}
                  onChange={(e) =>
                    setUpdatedFilm({ ...updatedFilm, salle: e.target.value })
                  }
                >
                  <option value="A">Salle A</option>
                  <option value="B">Salle B</option>
                  <option value="C">Salle C</option>
                  <option value="D">Salle D</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Description courte
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded h-24"
                  value={updatedFilm.description}
                  onChange={(e) =>
                    setUpdatedFilm({
                      ...updatedFilm,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              {/* Bouton de soumission */}
              <div className="col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300"
                  // onSubmit={() => handleFormSubmit(film._id, updatedFilm)}
                  onClick={handleFormSubmit}
                >
                  <Save className="mr-2" />
                  Modifier le film
                </button>
              </div>
            </div>

            <button
              type="button"
              className="absolute top-4 right-4 text-white"
              onClick={handleCloseEditModal}
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}

      {isDetailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form className="max-w-2xl bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Affichage information
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Champ de téléchargement d'affiche */}
              <div>
                <label className="block text-gray-300 mb-2">
                  URL de l'image
                </label>
                <input
                  type="text"
                  name="photo"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.photo}
                />
              </div>

              {/* Champs de formulaire */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Titre du film
                </label>
                <input
                  type="text"
                  name="titre"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.titre}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Année de sortie
                </label>
                <input
                  type="number"
                  name="Annee"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.Annee}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Catégorie</label>
                <input
                  type="text"
                  name="genre"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.genre}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Date de projection
                </label>
                <input
                  type="date"
                  name="date_proj"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.date_proj}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Durée (en mins)
                </label>
                <input
                  type="number"
                  name="duree"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.duree}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Heure de début
                </label>
                <input
                  type="text"
                  name="heure_debut"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.heure_debut}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Prix</label>
                <input
                  type="number"
                  name="prix"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.prix}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Salle</label>
                <select
                  name="salle"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={showDetails.salle}
                >
                  <option value="A">Salle A</option>
                  <option value="B">Salle B</option>
                  <option value="C">Salle C</option>
                  <option value="D">Salle D</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Ticket Vendus
                </label>
                <input
                  type="number"
                  name="ticket"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={ticketStats ? ticketStats.nombre_tickets : 0}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Argent gagnee
                </label>
                <input
                  type="number"
                  name="ticket"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  value={ticketStats ? ticketStats.revenu_total : 0}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">
                  Description courte
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded h-24"
                  value={showDetails.description}
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              className="absolute top-4 right-4 text-white"
              onClick={handleCloseDetailModal}
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
