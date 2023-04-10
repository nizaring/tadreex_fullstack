import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { useNavigate, useParams } from "react-router-dom";

const CompanyDetail = () => {
  const [courses, setCourses] = useState([]);

  const { id } = useParams();

  //afficher les formations acheter par cette entreprise
  useEffect(() => {
    axios
      .get(`https://tadreexbackend.onrender.com/company/${id}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  //retourner à la page précedente
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/dashboard/account");
  };

  //pour activer boutton et modifier la valeur de inprogreess to true
  const updateInProgress = async (courseId) => {
    try {
      await axios.put(
        `https://tadreexbackend.onrender.com/company/${id}/cours/${courseId}`,
        { inProgress: true }
      );
      setCourses(
        courses.map((course) =>
          course.course_id === courseId
            ? { ...course, inProgress: true }
            : course
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nom de formation
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Etat
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{course.title}</div>
              </td>
              <td>
                {course.inProgress ? (
                  <button
                    className="mt-2 bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                    disabled
                  >
                    terminer
                  </button>
                ) : (
                  <button
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateInProgress(course.course_id)}
                  >
                    Activer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <button
          onClick={goToDashboard}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go back
        </button>
      </div>
    </Fragment>
  );
};

export default CompanyDetail;
