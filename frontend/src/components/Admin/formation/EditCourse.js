import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [apkFile, setApkFile] = useState(null);

  useEffect(() => {
    axios
      .get(`https://tadreexbackend.onrender.com/training-courses/${id}`)
      .then((response) => {
        setTitle((response.data.title));
        setPrice((response.data.price));
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.error(error);
        // Afficher une erreur à l'utilisateur
      });
  }, [id]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    if (apkFile) {
      formData.append("apkFile", apkFile);
    }
    axios
      .put(`https://tadreexbackend.onrender.com/updateCourse/${id}`, formData)
      .then((response) => {
        console.log("updated");
        navigate("/dashboard/tableau");
      })
      .catch((error) => {
        console.error(error);
        // Afficher une erreur à l'utilisateur
      });
  };

  const handleCancel = () => {
    navigate("/dashboard/tableau");
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleApkFileChange = (event) => {
    setApkFile(event.target.files[0]);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div className="mb-4">
            <label
                     className="block text-gray-700 font-bold mb-2"
                     htmlFor="apkFile"
                   >
            APK File
            </label>
            <input
                     type="file"
                     id="apkFile"
                     name="apkFile"
                     accept=".apk"
                     onChange={handleApkFileChange}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   />
            </div>
            <div className="flex items-center justify-between">
            <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="button"
                     onClick={handleSave}
                   >
            Save
            </button>
            <button
                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="button"
                     onClick={handleCancel}
                   >
            Cancel
            </button>
            </div>
            </form>
            </div>
            );
            }
export default EditCourse;