/* eslint-disable no-unused-vars */
import Dashboard from "./components/Admin/Dashboard";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Parent from "./components/Admin/formation/Parent";
import Client from "./components/client/Client";
import Account from "./components/Admin/account/Account";
import Profile from "./components/profilePage/Profile";
import CompanyDetail from "./components/Admin/account/CompanyDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import EditCourse from "./components/Admin/formation/EditCourse";
import Formation from "./components/Admin/formation/Formation";
import { Fragment, useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfile from "./components/profilePage/EditProfile";
import OurService from './components/profilePage/OurService';
import EditAdminProfile from './components/Admin/EditProfile/EditAdminProfile';
import Services from './components/client/Services';
import Company from './components/client/Company';
import ShoppingCartProvider from "./components/context/ShoppingCartContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (email, password) => {
    setIsAuthenticated(true);
    setEmail(email);
    setPassword(password);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Fragment>
      <BrowserRouter>
        <ShoppingCartProvider>
          <Routes>
            <Route path="/" element={<Client />} >
              <Route index element={<Company />} />
              <Route path="signUp" element={<Company/>}/>
              <Route path="services" element={<Services/>}/>
            </Route>
            
            <Route path="/signIn" element={<Login onLogin={handleLogin}/>} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard onLogout={handleLogout} />
                </ProtectedRoute>
              }
            >
              <Route index element={<Account />} />
              <Route path="account" element={<Account />} />
              <Route path="formation">
                <Route path="tableau" element={<Parent />} />
                <Route path="" element={<Formation />} />
              </Route>
              <Route path="EditProfile" element={<EditAdminProfile/>}/>

              <Route path="tableau" element={<Parent />} />
              <Route path="companyDetails/:id" element={<CompanyDetail />} />
              <Route path="edit-course/:id" element={<EditCourse />} />
            </Route>

            <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
            >
              <Route index element={<OurService />} />
              <Route path="MyProfile" element={<EditProfile/>}/>
              <Route path="ourServices" element={<OurService/>}/>
            </Route>


            <Route path="pageNotFound" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/pageNotFound" />} />
          </Routes>
        </ShoppingCartProvider>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
