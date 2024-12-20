import React, { useRef } from "react";
import { CheckCircle, Download } from "lucide-react";

const TicketConfirmationPopup = ({ ticket, onClose }) => {
  const ticketRef = useRef(null);

  const handleDownload = async () => {
    try {
      // We'll use the browser's native functionality to create an image
      const ticketElement = ticketRef.current;
      if (!ticketElement) return;

      // Convert the ticket element to a canvas
      const canvas = await import("html2canvas").then((html2canvas) =>
        html2canvas.default(ticketElement, {
          backgroundColor: "#1f2937", // Match the popup background
          scale: 2, // Higher quality
        })
      );

      // Convert canvas to image and trigger download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `ticket-${ticket.nom_film}.png`;
      link.click();
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md w-full">
        <div ref={ticketRef}>
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-white mb-4">
            Ticket Confirmé!
          </h2>
          <div className="text-gray-300 space-y-2">
          <h1 className="text-center text-5xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
        Buja Box Office
      </h1>
            <p>
              <strong>Film:</strong> {ticket.nom_film}
            </p>
            <p>
              <strong>Nom:</strong> {ticket.nom}
            </p>
            <p>
              <strong>Email:</strong> {ticket.gmail}
            </p>
            <p>
              <strong>Prix:</strong> {ticket.prix} FBU
            </p>
            <p>
              <strong>Méthode de Paiement:</strong> {ticket.moyen_paiement}
            </p>
            <p>
              <strong>Salle:</strong> {ticket.place || "Non spécifié"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(ticket.date_time).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center"
          >
            <Download className="mr-2" size={20} />
            Télécharger
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmationPopup;

// import React, { useRef } from "react";
// import { CheckCircle, Download } from "lucide-react";
// import html2canvas from "html2canvas";

// const TicketConfirmationPopup = ({ ticket, onClose }) => {
//   const ticketRef = useRef(null);

//   const handleDownload = async () => {
//     if (ticketRef.current) {
//       const canvas = await html2canvas(ticketRef.current, {
//         backgroundColor: "#1f2937", // Match the popup background
//       });

//       const image = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = image;
//       link.download = `ticket-${ticket.nom_film}.png`;
//       link.click();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md w-full">
//         <div ref={ticketRef}>
//           <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Ticket Confirmé!
//           </h2>
//           <div className="text-gray-300 space-y-2">
//             <p>
//               <strong>Film:</strong> {ticket.nom_film}
//             </p>
//             <p>
//               <strong>Nom:</strong> {ticket.nom}
//             </p>
//             <p>
//               <strong>Email:</strong> {ticket.gmail}
//             </p>
//             <p>
//               <strong>Prix:</strong> {ticket.prix} FBU
//             </p>
//             <p>
//               <strong>Méthode de Paiement:</strong> {ticket.moyen_paiement}
//             </p>
//             <p>
//               <strong>Salle:</strong> {ticket.place || "Non spécifié"}
//             </p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(ticket.date_time).toLocaleString()}
//             </p>
//           </div>
//         </div>

//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center"
//           >
//             <Download className="mr-2" size={20} />
//             Télécharger
//           </button>
//           <button
//             onClick={onClose}
//             className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
//           >
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketConfirmationPopup;

// import React from "react";
// import { CheckCircle } from "lucide-react";

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

// export default TicketConfirmationPopup;
