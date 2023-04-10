import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, Transition } from "@headlessui/react";

const EditAdminProfile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const email = localStorage.getItem("email");
  console.log(email)
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios.post("https://tadreexbackend.onrender.com/changer-password", { ancien_mot_de_passe: oldPassword, nouveau_mot_de_passe: newPassword, confirmation_mot_de_passe: confirmPassword, email: email })
      .then((response) => {
        setMessage(response.data);
        setIsDialogOpen(true);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  }
  
  const handleReset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
  }
  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="text-3xl font-bold text-indigo-900 mb-4">
          Change password
        </div>
        <div className="mb-4">
          <label className="block text-red-900 font-bold mb-2">
            My email : {email}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="ancien_mot_de_passe" className="block text-gray-700 font-bold mb-2">
            Old password :
          </label>
          <input 
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="ancien_mot_de_passe" 
            type="password" 
            name="ancien_mot_de_passe" 
            required 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nouveau_mot_de_passe" className="block text-gray-700 font-bold mb-2">
            New password :
          </label>
          <input 
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="nouveau_mot_de_passe" 
            type="password" 
            name="nouveau_mot_de_passe" 
            required 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmation_mot_de_passe" className="block text-gray-700 font-bold mb-2">
            Confirm the new password :
          </label>
          <input 
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="confirmation_mot_de_passe" 
            type="password" 
            name="confirmation_mot_de_passe" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {message && <p className="text-red-500">{message}</p>}
        <div className="flex items-center justify-between">
        <button 
                 className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                 type="submit"
               >
        Save password
        </button>
        <button 
                 className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                 type="button"
                 onClick={handleReset}
               >
        Reset
        </button>
        </div>
        </form>
        <Transition show={isDialogOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
    
            <div className="inline-block align-middle my-8 p-8 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Password successfully updated
              </Dialog.Title>
              <Dialog.Description className="text-sm mb-4">Would you like to logout?</Dialog.Description>
              <div className="mt-4">
              <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={() => {
                localStorage.clear();
                window.location.href = "/signIn";
              }}>
                Yes
              </button>
              <button className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setIsDialogOpen(false)}>
                No
              </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
    );
  }
  
  export default EditAdminProfile;    
