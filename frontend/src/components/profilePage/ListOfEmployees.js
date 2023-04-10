import React from 'react'

const ListOfEmployees = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">List of employees</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Password
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">

        </tbody>
      </table>
    </div>
  )
}

export default ListOfEmployees