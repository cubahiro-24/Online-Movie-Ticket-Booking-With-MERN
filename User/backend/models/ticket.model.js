// import mongoose from "mongoose";

// const ticketSchema = new mongoose.Schema(
//   {
//     nom: {
//       type: String,
//       required: true,
//     },
//     gmail: {
//       type: String,
//       required: true,
//     },
//     prix: {
//       type: Number,
//       required: true,
//     },
//     moyen_paiement: {
//       type: String,
//       required: true,
//     },
//     date_time: {
//       type: Date,
//       default: Date.now,
//       required: true,
//     },
//     nom_film: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true, //Create at and update at
//   }
// );

// const Ticket = mongoose.model("Ticket", ticketSchema);

// export default Ticket;
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  gmail: { type: String, required: true },
  prix: { type: Number, required: true },
  moyen_paiement: { type: String, required: true },
  nom_film: { type: String, required: true },
  date_time: { type: Date, default: Date.now },
});
const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
