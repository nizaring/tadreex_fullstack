/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useTranslation } from "react-i18next";

const Navbar2 = (props) => {
  const { openCart, cartQuantity } = useShoppingCart();
  const [hasCode, setHasCode] = useState(false);
  //Menu button
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  //traduction
  const { t } = useTranslation();
  useEffect(() => {
    // Récupération de l'email depuis le localStorage
    const email = localStorage.getItem("email");
    if (email) {
      fetch(`http://localhost:3000/companyCode/${email}`)
        .then((response) => response.json())
        .then((data) => {
          setHasCode(data);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const [showNotification, setShowNotification] = useState(false);
  const [showOneTime, setShowOneTime] = useState(false);
  const handleClick = () => {
    setShowNotification(true);
    setShowOneTime(true);
  };
  //logout
  //confirmation logout
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };
  const navigate = useNavigate()
  const handleConfirmLogout = () => {
    // Perform the logout action here
    setShowConfirmation(!showConfirmation);
    // call the onLogout prop passed from the App component
    props.onLogout();
    navigate('/')
  };

  const handleCancelLogout = () => {
    setShowConfirmation(!showConfirmation);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          src={`http://localhost:3000/Company/${props.image}`}
          alt="Logo"
          className="w-8 mr-2"
        />
        <span className="font-semibold text-xl tracking-tight">
          {props.companyName}
        </span>
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
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto  ${showMenu ? '' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow lg:justify-end relative">
          <Link
            to="MyProfile"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            {t("My")} {t("profil")}
          </Link>
          <Link
            to="ourServices"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            {t("Our products")}
          </Link>
          <Link
            to="ListOfEmployees"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            {t("List of employees")}
          </Link>
          <Link
            to="#"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            {t("Our solution")}
          </Link>
          <Link
            to="#"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
          >
            {t("Contact us")}
          </Link>
          <>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-600 lg:inline-block"
            >
              {t("Logout")}
            </button>
            {showConfirmation && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {t("Confirm Logout")}
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {t("Are you sure you want to log out?")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={handleConfirmLogout}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-4 sm:w-auto sm:text-sm"
                      >
                        {t("Yes")}, {t("Logout")}
                      </button>
                      <button
                        onClick={handleCancelLogout}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {t("Cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
        <div className="flex">
          <button
            onClick={handleClick}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            className="flex items-center justify-center mr-4"
          >
            <img src="/assets/notification.png" width={38} />
            {!showOneTime && (
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
                <span className="text-white font-bold text-sm">
                  {hasCode ? "1" : "0"}
                </span>
              </div>
            )}
          </button>
          {showNotification && (
            <div className="absolute top-20 right-0 bg-white rounded-lg shadow-lg px-4 py-2">
              <p className="text-gray-800 font-medium">
                {t("New notification")}
              </p>
              <p className="text-gray-600">
                {t("Here is your company code")} : {props.code}
              </p>
              <button
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowNotification(false)}
              >
                {t("Close")}
              </button>
            </div>
          )}
          <button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            className="rounded-full bg-white border border-primary text-primary flex items-center justify-center"
            onClick={openCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-6 h-6"
            >
              <path
                d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"
                fill="currentColor"
              />
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
              <span className="text-white font-bold text-sm">
                {cartQuantity}
              </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
