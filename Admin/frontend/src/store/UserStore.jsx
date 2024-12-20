import { create } from 'zustand'


export const UserStore = create ((set) => ({  
  utilisateurs: [],
  setUtilisateurs: (utilisateurs) => set({ utilisateurs }),
  createUtilisateur: async (newUtilisateur) => {
    try{
      // Comprehensive validation with detailed logging
      console.log('Attempting to create film with data:', newUtilisateur);

      if(
        !newUtilisateur.nom ||
        !newUtilisateur.prenom ||
        !newUtilisateur.gmail ||
        !newUtilisateur.password ||
        !newUtilisateur.numero
      ) {
        console.error('Validation failed. Missing fields:', Object.keys(newUtilisateur).filter(key => !newUtilisateur[key]));
        return { success: false, message: "Remplissez tous les champs" }; 
      }
      // Fetch with error handling
      const res = await fetch("/api/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(newUtilisateur)
      });

      // Check response status
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', res.status, errorText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Utilisateur created successfully:', data);

      //Update user

      set((state) => ({ utilisateurs: [...state.utilisateurs, data.data] }));
      return { success: true, message: "Utilisateur Ajouté" };
    }
    catch(error){
      // Comprehensive error logging
      console.error('Error in createUtilisateur:', error);
      return {
        success: false,
        message: error.message || "Une erreur est survenue lors de la création de l'utilisateur"
      };
    }
  },
  fetchUtilisateurs: async () => {
    const res = await fetch("/api/utilisateurs")
    const data = await res.json()
    set({utilisateurs:data.data})
  },

  deleteUtilisateur: async (uid) => {
    const res = await fetch(`/api/utilisateurs/${uid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ utilisateurs: state.utilisateurs.filter((utilisateur) => utilisateur._id !== uid) }));
    return { success: true, message: data.message };
  },

  updateUtilisateur:async(uid,updatedUtilisateur)=>{
    const res=await fetch(`/api/utilisateurs/${uid}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(updatedUtilisateur)
    });
    const data=await res.json();
    if(!data.success) return {success:false, message:data.message};
    set((state)=>({
      utilisateurs:state.utilisateurs.map((utilisateur)=>utilisateur._id===uid?data.data:utilisateur)
    }));
    return {success:true, message:data.message};
  }
  
}));

export default UserStore;

