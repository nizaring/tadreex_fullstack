import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from "react-router-dom";
//traduction
import { useTranslation } from 'react-i18next';
function Formation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [apkFile, setApkFile] = useState(null);
  const [price, setPrice] = useState(0);
  //traduction 
  const {t} = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('apkFile', apkFile);
    formData.append('price', price);


    try {
      await axios.post('http://localhost:3000/addCourse', formData);
      console.log('Form submitted successfully');
      // Clear form inputs
      setTitle('');
      setPrice(0);
      setDescription('');
      setImage(null);
      setApkFile(null);

      navigate('/dashboard/tableau');

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleApkFileChange = (e) => {
    const selectedApkFile = e.target.files[0];
    setApkFile(selectedApkFile);
  };
  const [isClicked,setIsClicked] = useState(false);
  const handleclick = ()=>{
    setIsClicked(!isClicked)
  }
  return (
    <Fragment>
    {!isClicked && <div className="max-w-md mx-auto my-6 border-gray-500 border border-solid rounded-lg pt-6 pb-6 pr-8 pl-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">{t('Add a New Training Course')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            {t('Title')}
          </label>
          <input
            id="title"
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            {t('Price')}
          </label>
          <input
            id="price"
            type="number"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          </div>
          <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Image
          </label>
          <input
                   id="image"
                   type="file"
                   accept="image/*"
                   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={handleImageChange}
                   required
                 />
          </div>
          <div className="mb-4">
          <label htmlFor="apkFile" className="block text-gray-700 font-bold mb-2">
            {t('APK FILE')}
          </label>
          <input
                   id="apkFile"
                   type="file"
                   accept=".apk"
                   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={handleApkFileChange}
                   required
                 />
          </div>
          <button 
                 type="submit"
                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               >
            {t('Add Formation')}
          </button>
          {' '}
          <Link to="tableau">
          <button onClick={handleclick}
                 type="button"
                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               >
            {t('Go to table of formations')}
          </button>
          </Link>
          </form>
        </div>
      }
      <Outlet/>
      </Fragment>
    );
}
export default Formation;