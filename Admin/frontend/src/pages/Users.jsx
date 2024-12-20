import React from 'react'
import { Save, Upload } from 'lucide-react';
import UserStore from '../store/UserStore'
const Users = () => {

const [newUtilisateur, setNewUtilisateur] = React.useState({
  nom: '',
  prenom: '',
  gmail: '',
  password: '',
  numero: '',
});

const {createUtilisateur}=UserStore();
const handleAddNewUtilisateur=async (e) =>{
  const [success,message]=await createUtilisateur(newUtilisateur);
  console.log(success);
  console.log(message);
  e.preventDefault();
};


  return (
    <form className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">User</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Champ de téléchargement d'affiche */}
        

        {/* Champs de formulaire */}
        <div>
          <label className="block text-gray-300 mb-2">Nom</label>
          <input 
            type="text" 
            name="nom"
            required
            value={newUtilisateur.nom}
            onChange={(e)=> setNewUtilisateur({...newUtilisateur, nom: e.target.value})}
            className="w-full p-2 bg-gray-700 text-white rounded"
            
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Prenom</label>
          <input 
            type="text" 
            name="prenom"
            required
            value={newUtilisateur.prenom}
            onChange={(e)=> setNewUtilisateur({...newUtilisateur, prenom: e.target.value})}
            className="w-full p-2 bg-gray-700 text-white rounded"
            
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            name="gmail"
            required
            value={newUtilisateur.gmail}
            onChange={(e)=> setNewUtilisateur({...newUtilisateur, gmail: e.target.value})}
            className="w-full p-2 bg-gray-700 text-white rounded"
            
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Mot de passe</label>
          <input 
            type="number" 
            name="password"
            required
            value={newUtilisateur.password}
            onChange={(e)=> setNewUtilisateur({...newUtilisateur, password: e.target.value})}
            className="w-full p-2 bg-gray-700 text-white rounded"
           
          />
        </div>


        <div>
          <label className="block text-gray-300 mb-2">Numero</label>
          <input
            type="number"
            name="numero"
            required
            value={newUtilisateur.numero}
            onChange={(e)=> setNewUtilisateur({...newUtilisateur, numero: e.target.value})}
            className="w-full p-2 bg-gray-700 text-white rounded"
           
          />
        </div>
      

        {/* Bouton de soumission */}
        <div className="col-span-2 flex justify-center">
          <button 
            type="submit" 
            w='full'
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300"
           onClick={handleAddNewUtilisateur}
          >
            <Save className="mr-2" />
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  )
}

export default Users

