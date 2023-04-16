import React, { useState } from 'react';
import EditInformations from './EditInformations';
import EditAdminProfile from './EditAdminProfile';

const Edit = () => {
  const [switchComponent, setSwitchComponent] = useState(false);
  const [selectedButton, setSelectedButton] = useState('general');

  const handleGeneral = () => {
    setSwitchComponent(false);
    setSelectedButton('general');
  };

  const handlePassword = () => {
    setSwitchComponent(true);
    setSelectedButton('password');
  };

  return (
    <div className="bg3 flex justify-between">
      <div className="text-3xl text-white ml-10 mt-20 absolute">Settings</div>
      <div className="flex items-center mt-2 mr-20 ml-10 mb-40">
        <div className="border rounded bg-white p-2 flex flex-col">
          <button
            onClick={handleGeneral}
            className={`${
              selectedButton === 'general'
                ? 'bg-pink-400 hover:bg-pink-500'
                : 'bg-gray-300 hover:bg-gray-400'
            } text-white font-bold py-2 px-4 rounded mb-2`}
          >
            General
          </button>
          <button
            onClick={handlePassword}
            className={`${
              selectedButton === 'password'
                ? 'bg-pink-40