import React from 'react'
import { X,Upload,Save } from 'lucide-react'
import { useFilmstore } from '../store/Movie';


const UpdateMovie = () => {
    const [updatedFilm,setUpdatedFilm]=useState(film);
    const {updateFilm}=useFilmstore();
    const handleUpdateFilm=async (pid,updatedFilm)=>{
        await updateFilm(pid,updatedFilm);
        onclose();
    }
    return (
        

        <form className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
            
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Modification</h2>
                
           
            <div className="grid grid-cols-2 gap-6">
                {/* Champ de téléchargement d'affiche */}
                <div>
                    <label className="block text-gray-300 mb-2">URL de l'image</label>
                    <input 
                        type="text" 
                        name="photo"
                        // accept="image/*"
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.photo}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, photo: e.target.value})}
                        />

                </div> 

                {/* Champs de formulaire */}
                <div>
                    <label className="block text-gray-300 mb-2">Titre du film</label>
                    <input
                        type="text"
                        name="titre"
                        // value={formData.title}
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.titre}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, titre: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Année de sortie</label>
                    <input
                        type="NUMBER"
                        name="Annee"
                        // value={formData.year}
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.Annee}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, Annee: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Catégorie</label>
                    <input
                        type="text"
                        name="genre"
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.genre}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, genre: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Date de projection</label>
                    <input
                        type="date"
                        name="date_proj"
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.date_proj}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, date_proj: e.target.value})}
                    />
                </div>


                <div>
                    <label className="block text-gray-300 mb-2">Duree (en mins)</label>
                    <input
                        type="number"
                        name="duree"
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.duree}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, duree: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Heure de debut</label>
                    <input
                        type="string"
                        name="heure_debut"
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.heure_debut}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, heure_debut: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Prix</label>
                    <input
                        type="number"
                        name="prix"
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.prix}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, prix: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Salle</label>
                    <select
                        name="salle"
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={updatedFilm.salle}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, salle: e.target.value})}
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
                        // onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded h-24"
                        value={updatedFilm.description}
                        onChange={(e)=> setUpdatedFilm({...updatedFilm, description: e.target.value})}
                    ></textarea>
                </div>




                {/* Bouton de soumission */}
                <div className="col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300"
                        onClick={()=>handleUpdateFilm(film._id,updatedFilm)}
                    >
                        <Save className="mr-2" />
                        Modifier le film
                    </button>
                </div>
            </div>
        </form>
      
  )
}

export default UpdateMovie
