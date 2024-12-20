import mongoose from "mongoose";
import Utilisateur from "../models/utilisateur.model.js";


export const getUtilisateurs=async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({});
    res.status(200).json({ success: true, data: utilisateurs });
  }catch(error){
    console.error("Error in fetching utilisateurs",error.message);
    res.status(500).json({success:false,message:"Server Error"});
  }
}

export const createUtilisateur=async (req, res) => {
  const utilisateur = req.body; //user will send this data

  if (
    !utilisateur.nom ||
    !utilisateur.prenom ||
    !utilisateur.gmail ||
    !utilisateur.password ||
    !utilisateur.numero
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newUtilisateur = new Utilisateur(utilisateur);

  try {
    await newUtilisateur.save();
    res.status(201).json({ success: true, data: newUtilisateur });
  } catch (error) {
    console.error("Error in creating utilisateur", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateUtilisateur=async(req,res)=>{
  const {id}=req.params;
  const utilisateur=req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"Invalid utilisateur id"});
  }

  try{
    const updatedUtilisateur=await Utilisateur.findByIdAndUpdate  (id,utilisateur,{new:true}); 
    res.status(200).json({success:true,data: updatedUtilisateur});
  }catch(error){ 
    res.status(500).json({success:false,message:"Server Error"});
  } 
}

export const deleteUtilisateur=async(req,res)=>{
  const {id}=req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"Invalid utilisateur id"});
  }

  try{
    await Utilisateur.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"Utilisateur deleted"});
  }catch(error){
    console.error("Error in deleting utilisateur",error.message);
    res.status(500).json({success:false,message:"Server Error"});
  }

}