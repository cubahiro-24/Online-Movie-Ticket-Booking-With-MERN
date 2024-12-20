// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// const Login = () => {
//   return (
//     <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">
//       <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-300 font-bold mb-2"
//             >
//               Email
//               <FontAwesomeIcon
//                 icon={faEnvelope}
//                 className="ml-2 text-gray-400"
//               />
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-gray-300 font-bold mb-2"
//             >
//               Password
//               <FontAwesomeIcon icon={faLock} className="ml-2 text-gray-400" />
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <button
//               type="submit"
//               className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2
//                             focus:ring-offset-2 focus:ring-indigo-700"
//             >
//               Login
//             </button>
//           </div>
//           {/* <div className="mt-6 text-center text-sm">
//                         Don't have an account? <a href="#" className="text-indigo-500 hover:text-indigo-700">Sign Up</a>
//                     </div> */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [gmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher les erreurs
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser les erreurs

    try {
      const response = await axios.post(
        "http://localhost:5000/api/utilisateurs/login",
        {
          gmail,
          password: Number(password), // Conversion en nombre car le backend attend un Number
        }
      );

      // Vérifier la réponse du serveur
      if (response.data.success) {
        // Stocker les informations de l'utilisateur si nécessaire
        localStorage.setItem("user", JSON.stringify(response.data.data));

        // Redirection vers la page d'accueil
        navigate("/homepage");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      // Gestion des erreurs
      setError(err.response?.data?.message || "Une erreur est survenue");
      console.error("Erreur de connexion:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
            Buja Box Office
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-bold mb-2"
            >
              Email
              <FontAwesomeIcon
                icon={faEnvelope}
                className="ml-2 text-gray-400"
              />
            </label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              required
              className="w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              value={gmail}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-bold mb-2"
            >
              Password
              <FontAwesomeIcon icon={faLock} className="ml-2 text-gray-400" />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
