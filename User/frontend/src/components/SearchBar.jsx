// src/components/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-4 pr-12 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" />
      </div>
    </div>
  );
};

export default SearchBar;
