import React from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="pb-10">
        <Outlet/>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Contact />
      </div>
    </div>
  );
};

export default Client;
