/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
const Dashboard = ({ onLogout }) => {
    const [open, setOpen] = useState(true);
    const handleLogout = () => {
        // call the onLogout prop passed from the App component
        onLogout();
      };
    return (
        <div>
            <div className="flex">
                <div
                    className={` ${
                        open ? "w-72" : "w-20 "
                    } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
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
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Accounts
                            </span>
                        </li>
                        </Link>
                        <Link to="formation">
                        <li
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
                        >

                            <img src={`/assets/Formation.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Formation
                            </span>
                        </li>
                        </Link>
                        <Link to="EditProfile">
                        <li
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
                        >

                            <img src={`/assets/settings.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Setting
                            </span>
                        </li>
                        </Link>
                        <Link to="/" onClick={handleLogout}>
                        <li
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
                        >

                            <img src={`/assets/Logout.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Logout
                            </span>
                        </li>
                        </Link>
                    </ul>
                </div>
                <div className="h-screen flex-1 p-7">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
