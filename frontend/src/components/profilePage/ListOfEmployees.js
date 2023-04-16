import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  //traduction
  const { t } = useTranslation();
  //
  useEffect(() => {
    axios
      .get("http://localhost:3000/employees")
      .then((response) => {
        const data = response.data;
        setEmployees(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{t('List Of Employees')}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              {t('Company')}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              {t('Duration')}(s)
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              {t('Details')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.localId}>
              <td className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider">
                {employee.email}
              </td>
              <td className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider">
                {employee.company}
              </td>
              <td className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider">
                {employee.duration}
              </td>
              <td>
              <button 
                className="ml-2 mt-1 bg-gray-400 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button">
                  {t('Details')}
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
