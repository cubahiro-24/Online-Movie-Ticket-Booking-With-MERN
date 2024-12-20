import { create } from 'zustand'
import { updateFilm } from '../../../backend/controllers/film.controller';

export const useFilmstore = create((set) => ({
    films: [],
    setFilms: (films) => set({ films }),
    createFilm: async (newFilm) => {
        try {
            // Comprehensive validation with detailed logging
            console.log('Attempting to create film with data:', newFilm);

            // Corrected validation logic (note the '!' operators)
            if (!newFilm.titre ||
                !newFilm.duree ||
                !newFilm.genre ||
                !newFilm.photo ||
                !newFilm.description ||
                !newFilm.Annee ||
                !newFilm.prix ||
                !newFilm.salle ||
                !newFilm.heure_debut ||
                !newFilm.date_proj) {
                console.error('Validation failed. Missing fields:', Object.keys(newFilm).filter(key => !newFilm[key]));
                return { success: false, message: "Remplissez tous les champs" };
            }

            // Fetch with error handling
            const res = await fetch("/api/films", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFilm)
            });

            // Check response status
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Server error:', res.status, errorText);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Film created successfully:', data);

            // Update store
            set((state) => ({ films: [...state.films, data.data] }));

            return { success: true, message: "Film Ajouté" };

        } catch (error) {
            // Comprehensive error logging
            console.error('Error in createFilm:', error);
            return {
                success: false,
                message: error.message || "Une erreur est survenue lors de la création du film"
            };
        }
    },

    fetchFilms: async () => {
        const res = await fetch("/api/films")
        const data = await res.json()
        set({films:data.data})
    },

    deleteFilm: async (fid) => {
        const res = await fetch(`/api/films/${fid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ films: state.films.filter((film) => film._id !== fid) }));
        return { success: true, message: data.message };
    },

    updateFilm:async(pid,updatedFilm)=>{
        const res=await fetch(`/api/films/${pid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(updatedFilm),
        });
        const data=await res.json();
        if(!data.success) return {success:false,message:data.message};

        //update the ui immediately, without needing to refresh the data
        set((state)=>({
            films:state.films.map((film)=>(film._id===pid?data.data:film)),  
        }));

    },
}));