/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";

function Services() {
  const [tableauData, setTableauData] = useState([]);
  //traduction
  const { t } = useTranslation();
  useEffect(() => {
    axios
      .get("http://localhost:3000/training-courses")
      .then((response) => setTableauData(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Fragment>
      <div className="flex justify-center items-center h-16 bg-gray-100 text-gray-900 font-bold text-lg uppercase tracking-wide">
        {t('Our products')}
      </div>
      <div className="flex flex-wrap justify-center">
        {tableauData.map((course, index) => (
          <div class="max-w-sm mx-2 my-4 rounded-lg overflow-hidden shadow-md">
            <img
              class="w-full h-56 object-cover img-class"
              src={`http://localhost:3000/${course.image}`}
              alt={course.title}
            />
            <div class="px-6 py-4">
              <h2 class="font-bold text-2xl mb-2">{course.title}</h2>
              <p class="text-gray-700 text-lg mb-4">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .img-class {
          width: 300px;
          height: 300px; /* set your desired height here */
        }
      `}</style>
    </Fragment>
  );
}

export default Services;
