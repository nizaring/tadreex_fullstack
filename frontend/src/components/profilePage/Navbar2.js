/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar2 = (props) => {
  const {openCart, cartQuantity} = useShoppingCart()
  const [hasCode, setHasCode] = useState(false);
  useEffect(() => {
    // Récupération de l'email depuis le localStorage
    const email = localStorage.getItem("email");
    if (email) {
      fetch(`https://tadreexbackend.onrender.com/companyCode/${email}`)
        .then((response) => response.json())
        .then((data) => {
          setHasCode(data);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const [showNotification, setShowNotification] = useState(false);

  const handleClick = () => {
    setShowNotification(true);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={`https://tadreexbackend.onrender.com/Company/${props.image}`} alt="Logo" className="w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">
          {props.companyName}
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
          <svg
            className="h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow lg:justify-end relative">
          <Link
            to="MyProfile"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            My profile
          </Link>
          <Link
            to="ourServices"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            Our servises
          </Link>
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            List of employees
          </Link>
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            Our solution
          </Link>
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            Contact us
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 lg:inline-block"
          >
            Logout
          </Link>
        </div>
        <div className="flex">
          <button 
            onClick={handleClick}
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            className="flex items-center justify-center mr-4"
          >
          <img src="/assets/notification.png"  width={52}/>
          <div
            className={`rounded-full h-4 w-4 flex items-center justify-center ${
              hasCode ? "bg-red-600" : "bg-gray-300"
            }`}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
          <span className="text-white font-bold text-sm">{hasCode ? "1" : "0"}</span>
          </div>
        </button>
        {showNotification && (
          <div className="absolute top-20 right-0 bg-white rounded-lg shadow-lg px-4 py-2">
            <p className="text-gray-800 font-medium">Nouvelle notification</p>
            <p className="text-gray-600">
              Voici votre code d'entreprise : {props.code}
            </p>
            <button
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowNotification(false)}
            >
              Fermer
            </button>
          </div>
        )}
        <button 
          style={{ width: "3rem", height: "3rem", position: "relative" }} 
          className="rounded-full bg-white border border-primary text-primary flex items-center justify-center"
          onClick={openCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6">
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" fill="currentColor" />
          </svg>
          <div 
            className="rounded-full bg-red-600 h-4 w-4 flex items-center justify-center"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            <span className="text-white font-bold text-sm">{cartQuantity}</span>
          </div>
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar2;
