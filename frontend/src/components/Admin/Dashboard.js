/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from "react-i18next";

const Dashboard = ({ onLogout }) => {
  const [open, setOpen] = useState(true);
  //traduction
  const { t } = useTranslation();
  //darkmode
  const [darkMode, setDarkMode] = useState(false);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
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
        onLogout();
        navigate('/')

  };

  const handleCancelLogout = () => {
    setShowConfirmation(!showConfirmation);
  };
  return (
    <div>
      <div className="flex">
        <div
          className={` ${open ? "w-72" : "w-20 "} ${
            darkMode ? "bg-gray-900 dark-mode" : "bg-dark-purple"
          } h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src={`/assets/control.png`}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                            border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={`/assets/logo.png`}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Tadreex
            </h1>
          </div>
          <ul className="pt-6">
            <Link to="account">
              <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
              >
                <img src={`/assets/User.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {t("Accounts")}
                </span>
              </li>
            </Link>
            <Link to="formation">
              <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
              >
                <img src={`/assets/Formation.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Formation
                </span>
              </li>
            </Link>
            <Link to="EditProfile">
              <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
              >
                <img src={`/assets/settings.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {t("Settings")}
                </span>
              </li>
            </Link>
            <div>
            <div onClick={handleLogout}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
              >
                <img src={`/assets/Logout.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {t("Logout")}
                </span>
              </li>
            </div>
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
                            {t('Confirm Logout')}
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {t('Are you sure you want to log out?')}
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
                        {t('Yes')}, {t('Logout')}
                      </button>
                      <button
                        onClick={handleCancelLogout}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {t('Cancel')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}</div>
            <li
              className={`fixed inset-x-6 bottom-2 mt-8 flex rounded-md p-2 cursor-pointer hover:bg-gray-white text-gray-700 text-sm items-center gap-x-4 ${
                !open ? "hidden" : "" // hide the element when "open" is false
              }`}
            >
              <LanguageSelector />
            </li>
          </ul>
        </div>
        <div
          className={`h-screen flex-1 p-12 ${
            darkMode ? "bg-gray-300 dark-mode" : ""
          }`}
        >
          <button
            className="fixed right-6 top-6"
            onClick={handleToggleDarkMode}
          >
            {darkMode ? (
              <img
                src="/assets/moon2.png"
                alt="Switch to light mode"
                width="40px"
              />
            ) : (
              <img
                src="/assets/moon.png"
                alt="Switch to dark mode"
                width="40px"
              />
            )}
          </button>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
