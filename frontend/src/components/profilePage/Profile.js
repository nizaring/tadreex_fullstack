import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import WaitForAdminConfirmation from "./WaitForAdminConfirmation";
import { Outlet } from "react-router-dom";
//pour partager les données entre tous les components
export const CompanyContext = createContext();
const Profile = () => {
  const [code, setCode] = useState("");
  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [companyName, setCompanyName] = useState("");

  const email = localStorage.getItem("email");
  
  useEffect(() => {
    axios.get(`https://tadreexbackend.onrender.com/company/${email}`)
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
      <Navbar2 code={code} image={image} companyName={companyName} />
      {code ? <Outlet /> : <WaitForAdminConfirmation/>}
    </CompanyContext.Provider>
    </div>
  );
};

export default Profile;
