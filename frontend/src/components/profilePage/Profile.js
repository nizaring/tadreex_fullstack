import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import WaitForAdminConfirmation from "./WaitForAdminConfirmation";
import { Outlet } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
//pour partager les données entre tous les components
export const CompanyContext = createContext();
const Profile = ({ onLogout }) => {
  const [code, setCode] = useState("");
  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [companyName, setCompanyName] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/company/${email}`)
      .then((response) => {
        const company = response.data[0];
        setCode(company.code);
        setId(company.company_id);
        setImage(company.image);
        setCompanyName(company.companyname);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email]);

  return (
    <div>
      <CompanyContext.Provider value={id}>
        <Navbar2
          onLogout={onLogout}
          code={code}
          image={image}
          companyName={companyName}
        />
        {code ? <Outlet /> : <WaitForAdminConfirmation />}
        <div
          className={`fixed inset-x-6 bottom-2 mt-8 flex rounded-md p-2 cursor-pointer hover:bg-gray-white text-gray-700 text-sm items-center gap-x-4 `}
        >
          <LanguageSelector />
        </div>
      </CompanyContext.Provider>
    </div>
  );
};

export default Profile;
