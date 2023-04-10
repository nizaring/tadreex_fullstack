import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function Tableau({ tab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState(null);
  
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-course/${id}`);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleOpenDialog = (id) => {
    setCourseId(id);
    setIsOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`https://tadreexbackend.onrender.com/training-courses/${courseId}`)
      .then((response) => {
        console.log("deleted");
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Training Course Table</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              APK File
            </th>
            <th className="px-6 py-3 bg-gray-50 text-centre text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" colspan="2">Actions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tab.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">{row.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.price}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {row.description}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <img
                  src={`https://tadreexbackend.onrender.com/${row.image}`}
                  alt={row.title}
                  width="50px"
                />
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.apk_file}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <button
                  onClick={() => handleEdit(row.course_id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <button
                  onClick={() => handleOpenDialog(row.course_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={handleCloseDialog}
                  >
                    <div className="min-h-screen px-4 text-center">
                      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                      <div className="inline-block align-middle bg-white rounded-lg px-8 py-8 text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                          <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-medium text-gray-900"
                            >
                              Delete course
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm leading-5 text-gray-500">
                                Are you sure you want to delete this course ?
                              </p>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 flex justify-center">
                            <button
                              onClick={handleCloseDialog}
                              className="mr-4 inline-flex justify-center w-24 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleDelete}
                              className="inline-flex justify-center w-24 rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:shadow-outline-green focus:border-green-700 sm:text-sm sm:leading-5"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <Link to="/dashboard/formation">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go back
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Tableau;
