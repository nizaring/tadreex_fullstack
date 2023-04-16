import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  //traduction
  const { t } = useTranslation();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src="../../assets/Tadreex.png" alt="Logo" className="w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">Tadreex</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" onClick={toggleMenu}>
          <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${showMenu ? '' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow lg:justify-end">
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            {t('Home')}
          </Link>
          <Link to="#" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            {t('Trusted by')}
          </Link>
          <Link to="services" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            {t('Our products')}
          </Link>
          <Link to="#" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            {t('Our events')}
          </Link>
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
            {t('Our solution')}
          </Link>
          <Link to="signUp" className="block px-4 py-2 rounded-md text-white font-semibold bg-green-800 hover:bg-green-900 lg:inline-block mt-4 mr-2 lg:mt-0 lg:ml-4">
            {t('Sign up')}
          </Link>
          <Link to="/signin" className="block px-4 py-2 rounded-md text-white font-semibold bg-indigo-800 hover:bg-indigo-900 lg:inline-block mr-2 mt-4 lg:mt-0">
            {t('Sign in')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
