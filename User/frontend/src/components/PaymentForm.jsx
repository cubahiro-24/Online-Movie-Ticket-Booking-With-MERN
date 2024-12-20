import React, { useRef, useState } from "react";
import axios from "axios";
import TicketConfirmationPopup from "./TicketConfirmationPopup";
import {
  CircleUserRound,
  Mail,
  DollarSign,
  CreditCard,
  Clapperboard,
} from "lucide-react";

const PaymentForm = ({ movie, onTicketCreated }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log("Form submission started"); // Debug log

    try {
      const response = await axios.post("http://localhost:5000/api/tickets", {
        nom: nameRef.current.value,
        gmail: emailRef.current.value,
        moyen_paiement: paymentMethodRef.current.value,
        prix: movie.data.prix,
        nom_film: movie.data.titre,
        date_time: new Date(),
      });

      // console.log("Server response:", response.data); // Debug log

      if (response.data && response.data.success) {
        //console.log("Ticket creation successful"); // Debug log
        const ticketData = response.data.data;
        //console.log("Ticket data:", ticketData); // Debug log
        setTicketCreated(ticketData);
        onTicketCreated && onTicketCreated(ticketData);
      } else {
        throw new Error("Server response indicated failure");
      }
      // else {
      //   console.error("Ticket creation failed", response);
      //   alert("Échec de la création du ticket. Veuillez réessayer.");
      // }
    } catch (error) {
      console.error("Ticket creation error", error);
      alert("Échec de la création du ticket. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Current ticketCreated state:", ticketCreated); // Debug log

  return (
    <>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              placeholder="Votre Nom"
              ref={nameRef}
              required
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="email"
              placeholder="Votre email"
              ref={emailRef}
              required
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              value={movie.data.prix}
              disabled
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <select
              ref={paymentMethodRef}
              required
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Méthode de paiement</option>
              <option value="lumicash">Lumicash</option>
              <option value="bcb">BCB</option>
              <option value="crdb">CRDB</option>
            </select>
          </div>

          <div className="relative">
            <Clapperboard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              value={movie.data.titre}
              disabled
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Confirmation en cours..." : "Confirmer l'achat"}
          </button>
        </form>
      </div>

      {ticketCreated && (
        <div className="absolute top-0 left-0 w-full h-full">
          <TicketConfirmationPopup
            ticket={ticketCreated}
            onClose={() => setTicketCreated(null)}
          />
        </div>
      )}
    </>
  );
};

export default PaymentForm;

// import React, { useRef, useState } from "react";
// import axios from "axios";
// import TicketConfirmationPopup from "./TicketConfirmationPopup";
// import {
//   CircleUserRound,
//   Mail,
//   DollarSign,
//   CreditCard,
//   Clapperboard,
// } from "lucide-react";

// const PaymentForm = ({ movie, onTicketCreated }) => {
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const paymentMethodRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [ticketCreated, setTicketCreated] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/tickets", {
//         nom: nameRef.current.value,
//         gmail: emailRef.current.value,
//         moyen_paiement: paymentMethodRef.current.value,
//         prix: movie.data.prix,
//         nom_film: movie.data.titre,
//         date_time: new Date(),
//       });

//       if (response.data && response.data.success) {
//         const ticketData = response.data.data;
//         setTicketCreated(ticketData);
//         onTicketCreated && onTicketCreated(ticketData);
//       } else {
//         console.error("Ticket creation failed", response);
//         alert("Échec de la création du ticket. Veuillez réessayer.");
//       }
//     } catch (error) {
//       console.error("Ticket creation error", error);
//       alert("Échec de la création du ticket. Veuillez réessayer.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="relative">
//           <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             placeholder="Votre Nom"
//             ref={nameRef}
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="email"
//             placeholder="Votre email"
//             ref={emailRef}
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="relative">
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             value={movie.data.prix}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="relative">
//           <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <select
//             ref={paymentMethodRef}
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Méthode de paiement</option>
//             <option value="lumicash">Lumicash</option>
//             <option value="bcb">BCB</option>
//             <option value="crdb">CRDB</option>
//           </select>
//         </div>

//         <div className="relative">
//           <Clapperboard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             value={movie.data.titre}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
//         >
//           {isSubmitting ? "Confirmation en cours..." : "Confirmer l'achat"}
//         </button>
//       </form>

//       {ticketCreated && (
//         <TicketConfirmationPopup
//           ticket={ticketCreated}
//           onClose={() => setTicketCreated(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useRef, useState } from "react";
// import axios from "axios";
// import TicketConfirmationPopup from "./TicketConfirmationPopup";

// import {
//   CircleUserRound,
//   Mail,
//   DollarSign,
//   CreditCard,
//   Clapperboard,
//   Link,
// } from "lucide-react";

// const PaymentForm = ({ movie, onTicketCreated }) => {
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const paymentMethodRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [ticketCreated, setTicketCreated] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/tickets", {
//         nom: nameRef.current.value,
//         gmail: emailRef.current.value,
//         moyen_paiement: paymentMethodRef.current.value,
//         prix: movie.data.prix,
//         nom_film: movie.data.titre,
//         date_time: new Date(),
//       });

//       console.log("Full ticket response:", response);

//       if (response.data && response.data.success) {
//         console.log("Ticket created successfully");
//         const ticketData = response.data.data;
//         setTicketCreated(ticketData);
//         onTicketCreated && onTicketCreated(ticketData);
//       } else {
//         console.error("Ticket creation failed", response);
//         alert("Échec de la création du ticket. Veuillez réessayer.");
//       }
//     } catch (error) {
//       console.error("Ticket creation error", error);
//       alert("Échec de la création du ticket. Veuillez réessayer.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Render ticket confirmation popup if ticket is created
//   if (ticketCreated) {
//     return (
//       <TicketConfirmationPopup
//         ticket={ticketCreated}
//         onClose={() => setTicketCreated(null)}
//       />
//     );
//   }

//   return (
//     <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div className="relative">
//           <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             placeholder="Votre Nom"
//             ref={nameRef}
//             defaultValue=""
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Email Input */}
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="email"
//             placeholder="Votre email"
//             ref={emailRef}
//             defaultValue=""
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Price Input */}
//         <div className="relative">
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             defaultValue={movie.data.prix}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Payment Method Select */}
//         <div className="relative">
//           <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <select
//             ref={paymentMethodRef}
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Méthode de paiement</option>
//             <option value="lumicash">Lumicash</option>
//             <option value="bcb">BCB</option>
//             <option value="crdb">CRDB</option>
//           </select>
//         </div>

//         {/* Movie Title Input */}
//         <div className="relative">
//           <Clapperboard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             defaultValue={movie.data.titre}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
//         >
//           {isSubmitting ? "Confirmation en cours..." : "Confirmer l'achat"}
//         </button>
//       </form>

//       {ticketCreated && ( // Render popup only if ticketCreated is not null
//         <TicketConfirmationPopup
//           ticket={ticketCreated}
//           onClose={() => setTicketCreated(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useRef, useState } from "react";
// import axios from "axios";

// import {
//   CircleUserRound,
//   Mail,
//   DollarSign,
//   CreditCard,
//   Clapperboard,
//   CheckCircle,
// } from "lucide-react";

// const TicketConfirmationPopup = ({ ticket, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md w-full">
//         <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
//         <h2 className="text-2xl font-bold text-white mb-4">Ticket Confirmé!</h2>
//         <div className="text-gray-300 space-y-2">
//           <p>
//             <strong>Film:</strong> {ticket.nom_film}
//           </p>
//           <p>
//             <strong>Nom:</strong> {ticket.nom}
//           </p>
//           <p>
//             <strong>Email:</strong> {ticket.gmail}
//           </p>
//           <p>
//             <strong>Prix:</strong> {ticket.prix} FBU
//           </p>
//           <p>
//             <strong>Méthode de Paiement:</strong> {ticket.moyen_paiement}
//           </p>
//           <p>
//             <strong>Salle:</strong> {ticket.place}
//           </p>
//           <p>
//             <strong>Date:</strong> {new Date(ticket.date_time).toLocaleString()}
//           </p>
//         </div>
//         <button
//           onClick={onClose}
//           className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
//         >
//           Fermer
//         </button>
//       </div>
//     </div>
//   );
// };

// const PaymentForm = ({ movie, onTicketCreated }) => {
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const paymentMethodRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [ticketCreated, setTicketCreated] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/tickets", {
//         nom: nameRef.current.value,
//         gmail: emailRef.current.value,
//         moyen_paiement: paymentMethodRef.current.value,
//         prix: movie.data.prix,
//         nom_film: movie.data.titre,
//         date_time: new Date(),
//       });

//       if (response.data.success) {
//         console.log("done");
//         setTicketCreated(response.data.data);
//         console.log(response.data.data);

//         onTicketCreated && onTicketCreated(response.data.data);
//       }
//     } catch (error) {
//       console.error("Ticket creation failed", error);
//       alert("Échec de la création du ticket. Veuillez réessayer.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (ticketCreated) {
//     return (
//       <TicketConfirmationPopup
//         ticket={ticketCreated}
//         onClose={() => setTicketCreated(null)}
//       />
//     );
//   }

//   return (
//     <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div className="relative">
//           <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             placeholder="Votre Nom"
//             ref={nameRef}
//             defaultValue=""
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Email Input */}
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="email"
//             placeholder="Votre email"
//             ref={emailRef}
//             defaultValue=""
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Price Input */}
//         <div className="relative">
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             defaultValue={movie.data.prix}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Payment Method Select */}
//         <div className="relative">
//           <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <select
//             ref={paymentMethodRef}
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Méthode de paiement</option>
//             <option value="lumicash">Lumicash</option>
//             <option value="bcb">BCB</option>
//             <option value="crdb">CRDB</option>
//           </select>
//         </div>

//         {/* Movie Title Input */}
//         <div className="relative">
//           <Clapperboard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             defaultValue={movie.data.titre}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
//         >
//           {isSubmitting ? "Confirmation en cours..." : "Confirmer l'achat"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

//corect code without pop up

// import React, { useRef, useState } from "react";
// import axios from "axios";

// import {
//   CircleUserRound,
//   Mail,
//   DollarSign,
//   CreditCard,
//   Clapperboard,
//   CheckCircle,
// } from "lucide-react";

// const TicketConfirmationPopup = ({ ticket, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md w-full">
//         <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
//         <h2 className="text-2xl font-bold text-white mb-4">Ticket Confirmé!</h2>
//         <div className="text-gray-300 space-y-2">
//           <p>
//             <strong>Film:</strong> {ticket.nom_film}
//           </p>
//           <p>
//             <strong>Nom:</strong> {ticket.nom}
//           </p>
//           <p>
//             <strong>Email:</strong> {ticket.gmail}
//           </p>
//           <p>
//             <strong>Prix:</strong> {ticket.prix} FBU
//           </p>
//           <p>
//             <strong>Méthode de Paiement:</strong> {ticket.moyen_paiement}
//           </p>
//           <p>
//             <strong>Salle:</strong> {ticket.place || "Non spécifié"}
//           </p>
//           <p>
//             <strong>Date:</strong> {new Date(ticket.date_time).toLocaleString()}
//           </p>
//         </div>
//         <button
//           onClick={onClose}
//           className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
//         >
//           Fermer
//         </button>
//       </div>
//     </div>
//   );
// };

// const PaymentForm = ({ movie, onTicketCreated }) => {
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const paymentMethodRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [ticketCreated, setTicketCreated] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/tickets", {
//         nom: nameRef.current.value,
//         gmail: emailRef.current.value,
//         moyen_paiement: paymentMethodRef.current.value,
//         prix: movie.data.prix,
//         nom_film: movie.data.titre,
//         date_time: new Date(),
//       });

//       console.log("Response:", response.data); // Detailed logging

//       if (response.data && response.data.success) {
//         console.log("Ticket created successfully");
//         setTicketCreated(response.data.data);
//         onTicketCreated && onTicketCreated(response.data.data);
//       } else {
//         console.error("Ticket creation failed: No success flag");
//         alert("Échec de la création du ticket. Réponse invalide.");
//       }
//     } catch (error) {
//       console.error("Ticket creation failed", error);
//       alert("Échec de la création du ticket. Veuillez réessayer.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Debug logging
//   if (ticketCreated) {
//     console.log("Ticket created state:", ticketCreated);
//   }

//   if (ticketCreated) {
//     return (
//       <TicketConfirmationPopup
//         ticket={ticketCreated}
//         onClose={() => setTicketCreated(null)}
//       />
//     );
//   }

//   return (
//     <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div className="relative">
//           <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             placeholder="Votre Nom"
//             ref={nameRef}
//             defaultValue=""
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Email Input */}
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="email"
//             placeholder="Votre email"
//             ref={emailRef}
//             defaultValue=""
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Price Input */}
//         <div className="relative">
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             defaultValue={movie.data.prix}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Payment Method Select */}
//         <div className="relative">
//           <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <select
//             ref={paymentMethodRef}
//             required
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Méthode de paiement</option>
//             <option value="lumicash">Lumicash</option>
//             <option value="bcb">BCB</option>
//             <option value="crdb">CRDB</option>
//           </select>
//         </div>

//         {/* Movie Title Input */}
//         <div className="relative">
//           <Clapperboard className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//           <input
//             type="text"
//             defaultValue={movie.data.titre}
//             disabled
//             className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
//         >
//           {isSubmitting ? "Confirmation en cours..." : "Confirmer l'achat"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;
