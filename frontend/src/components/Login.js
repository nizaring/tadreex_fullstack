import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";


function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //traduction
  const { t } = useTranslation();
  //
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email); // save the user's email in local storage
      onLogin(email, password);

      // Get the list of admin logins from the admin table
      const adminLoginsResponse = await axios.get(
        "http://localhost:3000/admin"
      );
      const adminLogins = adminLoginsResponse.data;

      // Check if the entered email and password match an admin login
      const isAdminLogin = adminLogins.some(
        (adminLogin) => adminLogin.email === email
      );

      if (isAdminLogin) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      // Display error message to the user using Tailwind CSS notification
      const notification = document.createElement("div");
      notification.innerHTML =
      <div className="flex items-center justify-center"><span>{t('Invalid email or password. Please try again.')}</span></div>
      notification.classList.add(
        "bg-red-500",
        "text-white",
        "py-3",
        "px-4",
        "rounded-md",
        "fixed",
        "top-10",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "z-50"
      );
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2500);
    }
  };

  //return to home page "/"
  const goBack = () => {
    navigate("/signUp");
  };

  return (
    <div className="bg1 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-stone-200 py-8 px-4 shadow sm:rounded-lg sm:px-10  ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-4 text-center text-3xl font-extrabold text-red-500">
                {t('Sign in to your account')}
              </h2>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t('Email address')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t('Password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {t('Remember me')}
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t('Forgot your password?')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('Sign in')}
              </button>
            </div>
            <div>
              <button
                onClick={goBack}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
              >
                {t('create new account')}
              </button>
            </div>
          </form>
        </div>
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 flex rounded-md p-2 cursor-pointer hover:bg-gray-white text-gray-700 text-sm items-center gap-x-4 `}
        >
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
export default Login;
