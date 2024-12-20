import React from 'react'
import { Plus, Home, CircleUserRound } from 'lucide-react'
import { Link } from 'react-router'
const NavBar = () => {
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-gray-900">
            {/* Section gauche : Titre */}
            <div className="flex items-center">
                <Link to="/homepage" className="flex items-center">
                    <Home className="mr-2 text-blue-500" />
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
                        Buja Box Office
                    </h1>
                </Link>
            </div>

            {/* Section droite : Bouton "+" */}
            <nav className="flex items-center">
                <Link
                    to="/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition duration-300 flex items-center justify-center"
                >
                    <Plus size={24} />
                </Link>

                <Link
                    to="/users"
                    className="bg-blue-600 hover:bg-blue-700 ml-4 text-white p-2 rounded-full transition duration-300 flex items-center justify-center"
                >
                    <CircleUserRound size={24} />
                </Link>

                <Link
                    to="/"
                    className="bg-blue-600 ml-4 hover:bg-blue-700 text-white p-2 rounded-full transition duration-300 flex items-center justify-center"
                >
                    <p>
                        Logout
                    </p>
                </Link>
            </nav>

        </header>

    )
}

export default NavBar
