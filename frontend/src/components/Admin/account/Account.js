import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [companies, setCompanies] = useState([]);
  const [newCode, setNewCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [companyId, setCompanyId] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [updated, setUpdated] = useState(0);
  //for confirmation dialog (delete)
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = (id) => {
    setCompanyId(id);
    setIsOpen(true);
  };
  //show details of company
  const navigate = useNavigate();
  const handleDetail = (companyId) => {
    navigate(`/dashboard/companyDetails/${companyId}`);
    console.log("show more details");
  };
  // show list of companies
  useEffect(() => {
    axios
      .get(`https://tadreexbackend.onrender.com/company?_=${deleted}`)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [deleted, updated]);
  //delete account of company
  const handleClick = () => {
    axios
      .delete(`https://tadreexbackend.onrender.com/company/${companyId}`)
      .then((response) => {
        console.log("deleted");
        setDeleted(Date.now()); // update the random number
      })
      .catch((error) => {
        console.error(error);
      });
    setIsOpen(false);
  };
  //Update company information (adding code to company)
  const updateHandleClick = async (company_id) => {
    try {
      const response = await axios.get(
        `https://tadreexbackend.onrender.com/check-company-by-code/${newCode}`
      );
      console.log(response.data);
      if (!response.data) {
        const response = await axios.put(
          `https://tadreexbackend.onrender.com/update-company/${company_id}`,
          { code: newCode }
        );
        console.log("updated");
        setUpdated(Date.now()); // update the random number
        console.log(response);
      } else {
        alert(`Company with code ${newCode} already exists.`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  //notification for detail button
  const [courseCount, setCourseCount] = useState(0);
  useEffect(() => {
    axios
      .get(`https://tadreexbackend.onrender.com/company/${1}/courses`)
      .then((response) => {
        setCourseCount(response.data.length);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Company name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Message
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Code
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {companies.map(
          (company) =>
              <tr key={company.company_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {company.companyname}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {company.code ? (
                    <div className="text-sm text-gray-900">{company.code}</div>
                  ) : (
                    <input
                      type="text"
                      name="code"
                      id="code"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-gray"
                      placeholder="Code"
                      required
                      onChange={(event) => setNewCode(event.target.value)}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-2">
                    {company.code ? (
                      <p className="text-green-500 font-bold">
                        Code already generated
                      </p>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => updateHandleClick(company.company_id)}
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenDialog(company.company_id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                    <button
                      className="relative bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleDetail(company.company_id)}
                    >
                      Detail
                      {courseCount > 0 && company.company_id===1 && (
                        <span className="absolute top-0 -right-1 -mt-2 -mr-1 h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {courseCount}
                        </span>
                      )}
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
                                  Delete company account
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm leading-5 text-gray-500">
                                    Are you sure you want to delete this company
                                    account ?
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
                                  onClick={handleClick}
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
                  </div>
                </td>
              </tr>
            )
        }
      </tbody>
    </table>
  );
};

export default Account;
