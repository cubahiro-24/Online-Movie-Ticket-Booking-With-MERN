import React from 'react'
import { Save, Upload } from 'lucide-react';
import { useFilmstore } from '../store/Movie';

const CreateMovie = () => {
  const [newFilm, setNewFilm] = React.useState({
    titre: '',
    duree: '',
    genre: '',
    description: '',
    Annee: '',
    photo: '',
    prix: '',
    salle: '',
    heure_debut: '',
    date_proj: '',
  });

  const {createFilm}=useFilmstore();
  const handleAddNewFilm=async (e) =>{
    const {success,message}=await createFilm(newFilm);
    console.log(success);
    console.log(message);
    e.preventDefault();
  };

  return (
  
    <form className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Création</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Champ de téléchargement d'affiche */}
        

        <div>
          <label className="block text-gray-300 mb-2">URL de l'image</label>
          <input 
              type="text" 
              name="photo"
              // accept="image/*"
              className="w-full p-2 bg-gray-700 text-white rounded"
              value={newFilm.photo}
              onChange={(e)=> setNewFilm({...newFilm, photo: e.target.value})}
            />

        </div>  



        


        {/* Champs de formulaire */}
        <div>
          <label className="block text-gray-300 mb-2">Titre du film</label>
          <input 
            type="text" 
            name="titre"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.titre}
            onChange={(e)=> setNewFilm({...newFilm, titre: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Année de sortie</label>
          <input 
            type="NUMBER" 
            name="Annee"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.Annee}
            onChange={(e)=> setNewFilm({...newFilm, Annee: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Catégorie</label>
          <input 
            type="text" 
            name="genre"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.genre}
            onChange={(e)=> setNewFilm({...newFilm, genre: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Date de projection</label>
          <input 
            type="date" 
            name="date_proj"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.date_proj}
            onChange={(e)=> setNewFilm({...newFilm, date_proj: e.target.value})}
          />
        </div>


        <div>
          <label className="block text-gray-300 mb-2">Duree (en mins)</label>
          <input
            type="number"
            name="duree"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.duree}
            onChange={(e)=> setNewFilm({...newFilm, duree: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Heure de debut</label>
          <input
            type="string"
            name="heure_debut"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.heure_debut}
            onChange={(e)=> setNewFilm({...newFilm,heure_debut: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Prix</label>
          <input
            type="number"
            name="prix"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.prix}
            onChange={(e)=> setNewFilm({...newFilm, prix: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Salle</label>
          <select
            name="salle"
            required
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={newFilm.salle}
            onChange={(e)=> setNewFilm({...newFilm, salle: e.target.value})}
          >
            <option value="A">Salle A</option>
            <option value="B">Salle B</option>
            <option value="C">Salle C</option>
            <option value="D">Salle D</option>
          </select>
        </div>


        <div className="col-span-2">
          <label className="block text-gray-300 mb-2">Description courte</label>
          <textarea 
            name="description"
            required
            className="w-full p-2 bg-gray-700 text-white rounded h-24"
            value={newFilm.description}
            onChange={(e)=> setNewFilm({...newFilm, description: e.target.value})}
          ></textarea>
        </div>

        
      

        {/* Bouton de soumission */}
        <div className="col-span-2 flex justify-center">
          <button 
            type="submit" 
            w='full'
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300"
            onClick={handleAddNewFilm}
          >
            <Save className="mr-2" />
            Enregistrer le film
          </button>
        </div>
      </div>
    </form>
    
   )
 }

export default CreateMovie

