/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';

function EditInformations() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSave() {
    // Code pour enregistrer les données du formulaire
  }

  function handleCancel() {
    // Code pour annuler l'enregistrement et vider le formulaire
  }
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const email1 = localStorage.getItem("email");

  return (
    <form className="flex flex-col space-y-6 border p-4 bg-white mr-5 pr-10 mt-20 rounded">
    <div className="flex items-center space-x-4 mb-2 ml-10 ">
        <div className="relative">
        <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
        <div>
            <img src="/assets/bg.jpg" width='80px' />
        </div>
      </div>
      <hr/>
      <div className='mr-80 ml-10 '>
      <div className='w-80'>
        <label htmlFor="username" className="font-medium text-gray-500">
          Username
        </label>
        <input
            id="username"
            name="username"
            type="username"
            className="border-gray-300 px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 text-gray-600 placeholder-gray-400 border-b-2 border-black"
            placeholder="username"
            onChange={handleUsernameChange}
            value={username}
        />
      </div>
      <div>
        <label htmlFor="email" className="font-medium text-gray-500">
          Email
        </label>
        <input
            id="email"
            name="email"
            type="email"
            className="border-gray-300 px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 text-gray-600 placeholder-gray-400 border-b-2 border-black"
            placeholder={email1}
            onChange={handleEmailChange}
            value={email}
        />
      </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 mr-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSave}
        >
          Save modifications
        </button>
        <button
          type="button"
          className="px-4 py-2  border border-transparent text-base font-medium rounded-md text-white bg-rose-400 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleCancel}
        >
          Cancel
        </button>
        </div>
    </form>
    );
}

export default EditInformations;    