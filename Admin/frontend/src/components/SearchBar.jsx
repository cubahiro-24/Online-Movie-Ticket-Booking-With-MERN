// import React from 'react'
// import { Search } from 'lucide-react'
// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//     return (
//         <div className="relative w-full max-w-xl mx-auto mb-8 mt-10">
//             <input
//                 type="text"
//                 placeholder="Rechercher un film..."
//                  value={searchTerm}
//                 onChange={(e)=> setSearchTerm(e.target.value)}
//                 className="w-full p-3 pl-10 pr-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
//         </div>
//     )
// }

// export default SearchBar

import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 mt-10">
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 pl-10 pr-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
    </div>
  );
};

export default SearchBar;
