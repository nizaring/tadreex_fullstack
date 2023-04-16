import Contact from "./Contact";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";

const Client = () => {
  return (
    <div className="">
      <Navbar />
      <div className=" ">
        <Outlet/>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div
          className={`fixed inset-x-6  flex rounded-md p-2 cursor-pointer hover:bg-gray-white text-gray-700 text-sm items-center gap-x-4 `}
        >
          <LanguageSelector/>
        </div>
        <Contact />
      </div>
      
    </div>
  );
};

export default Client;
