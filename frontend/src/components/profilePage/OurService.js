/* eslint-disable no-undef  */ 
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./OurService.css";
import { CompanyContext } from "./Profile";
import { useContext } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useTranslation } from "react-i18next";
function OurService() {
  const [tableauData, setTableauData] = useState([]);
  const [tableauDataB, setTableauDataB] = useState([]);
  const { getItemQuantity, increaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const id = useContext(CompanyContext);

  const [inProgress, setInProgress] = useState(false);
  //traduction
  const { t } = useTranslation();
  //
  useEffect(() => {
    axios
      .get("http://localhost:3000/training-courses")
      .then((response) => setTableauData(response.data))
      .catch((err) => console.error(err));
  }, []);
  //on peut utiliser pour cacher remove button
  useEffect(() => {
    <CompanyContext.Consumer>
      {(id) => {
        axios
          .get(`http://localhost:3000/companyB/${id}`)
          .then((response) => setTableauDataB(response.data))
          .catch((err) => console.error(err));
      }}
    </CompanyContext.Consumer>;
  }, [id]);
  const ispurchased = tableauDataB.map((item) => item.ispurchased);

  useEffect(() => {
    tableauData.forEach((course) => {
      axios
        .get(`http://localhost:3000/companyC/${id}/course/${course.course_id}`)
        .then((response) =>
          setInProgress((prev) => ({
            ...prev,
            [course.course_id]: response.data[0]?.inprogress || false,
          }))
        )
        .catch((err) => console.error(err));
    });
  }, [id, tableauData]);

  //download apk file
  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:3000/download/${filename}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center h-16 bg-gray-100 text-gray-900 font-bold text-lg uppercase tracking-wide">
        {t('Our products')}
      </div>
      <div className="flex flex-wrap justify-center">
        {tableauData.map((course, index) => (
          <div
            className="max-w-sm mx-4 my-4 rounded-lg overflow-hidden shadow-md"
            key={index}
          >
            <img
              className="w-full h-56 object-cover custom-image-width"
              src={`http://localhost:3000/${course.image}`}
              alt={course.title}
            />
            <div className="px-6 py-4">
              <div className="flex">
                <div className="flex-1 font-bold text-xl mb-2">
                  {course.title}
                </div>
                <div className="font-bold text-xl mb-2">
                  {course.price}
                  {" tnd"}
                </div>
              </div>
              <p className="text-gray-700 text-base">{course.description}</p>
            </div>

            <div className="mt-auto">
              {!inProgress[course.course_id] &&
              getItemQuantity(course.course_id) === 0 ? (
                <button
                  onClick={() => {
                    increaseCartQuantity(course.course_id, course.price, id);
                  }}
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {t('Add To Cart')}
                </button>
              ) : (
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center justify-center gap-0.5"></div>
                  {!ispurchased && (
                    <button
                      onClick={() => {
                        removeFromCart(course.course_id);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
            {inProgress[course.course_id] && course.course_id && (
              <div className="flex justify-center items-center mb-2">
                <button
                  name="download"
                  className="rounded-full bg-white-500 hover:bg-yellow-400 text-white w-10 h-10 focus:outline-none flex items-center justify-center border-2 border-white-600"
                  onClick={() => handleDownload(course.apk_file)}
                >
                  <img
                    src="/assets/download.png"
                    alt="download"
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default OurService;
