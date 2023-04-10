import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MailIcon,
  KeyIcon,
  PhoneIcon,
  UserCircleIcon,
  PhotographIcon,
  ChatIcon,
} from "@heroicons/react/solid";

const Company = () => {
  const [trainingCourses, setTrainingCourses] = useState([]);
  useEffect(() => {
    const fetchTrainingCourses = async () => {
      try {
        const res = await axios.get("https://tadreexbackend.onrender.com/training-courses");
        setTrainingCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrainingCourses();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    companyName: "",
    trainingCourse: "",
    message: "",
    image: "",
  });

  const navigate = useNavigate();

  const [emailExists, setEmailExists] = useState(false); // add emailExists state
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailExistsRes = await axios.get(`https://tadreexbackend.onrender.com/api/check-email/${formData.email}`);
      setEmailExists(emailExistsRes.data); // set emailExists state
      if (emailExistsRes.data === false) {
        const formDataWithImage = new FormData();
        formDataWithImage.append("email", formData.email);
        formDataWithImage.append("password", formData.password);
        formDataWithImage.append("phone", formData.phone);
        formDataWithImage.append("companyName", formData.companyName);
        formDataWithImage.append("trainingCourse", formData.trainingCourse);
        formDataWithImage.append("message", formData.message);
        formDataWithImage.append("image", formData.image);
  
        const res = await axios.post(
          "https://tadreexbackend.onrender.com/submit-company",
          formDataWithImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);
        navigate("/signin");
      } 
    } catch (error) {
      console.error(error);
      alert("Failed to insert data into the database");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "trainingCourse") {
      const selectedCourse = trainingCourses.find(
        (course) => course.id_formation === parseInt(value)
      );
      console.log(selectedCourse.title);
      setFormData({
        ...formData,
        [name]: parseInt(value),
        trainingCourse: selectedCourse.title,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({
      ...formData,
      image: selectedImage,
    });
  };
  return (
    <form className="max-w-lg mx-auto mt-4" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-12 bg-gray-100 text-gray-900 font-bold text-lg uppercase tracking-wide">
        Create an account
      </div>
      <div className="mb-2 my-2">
        <label
          htmlFor="email"
          className="flex items-center text-gray-700 font-bold mb-2"
        >
          <MailIcon className="w-6 h-6 mr-2" />
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={formData.email}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Veuillez entrer une adresse e-mail valide."
        />
        {emailExists && (
          <p className="text-red-500 text-xs mt-1">
            This email is already registered, please use another one.
          </p>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="password"
          className="flex items-center text-gray-700 font-bold mb-2"
        >
          <KeyIcon className="w-6 h-6 mr-2" />
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={formData.password}
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Le mot de passe doit comporter au moins huit caractères, dont au moins une lettre majuscule, une lettre minuscule et un chiffre."
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="phone"
          className="flex items-center text-gray-700 font-bold mb-2"
        >
          <PhoneIcon className="w-6 h-6 mr-2" />
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={formData.phone}
          required
          pattern="^[0-9]+$"
          title="Le numéro de téléphone doit être composé uniquement de chiffres."
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="companyName"
          className="flex items-center text-gray-700 font-bold mb-2"
        >
          <UserCircleIcon className="w-6 h-6 mr-2" />
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={formData.companyName}
          required
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="image"
          className="flex items-center text-gray-700 font-bold mb-2"
        >
          <PhotographIcon className="w-6 h-6 mr-2" />
          Company logo
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
      <div className="mb-2">
        <label
          htmlFor="message"
          className="flex items-center text-gray-700 font-bold mb-2"
        >
          <ChatIcon className="w-6 h-6 mr-2" />
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="2"
          onChange={handleChange}
          value={formData.message}
          placeholder="Add a description of your company (optional)"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
export default Company;
