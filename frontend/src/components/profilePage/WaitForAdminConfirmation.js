import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';

function WaitForAdminConfirmation() {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <div className="flex items-center">
        <div className="py-1">
          <HiInformationCircle className="h-6 w-6 fill-current" />
        </div>
        <div className="ml-2">
          <span className="font-medium">Info alert!</span>
          <span className="block sm:inline"> your account is waiting for approval by admin. this process may take up to 24 hours</span>
        </div>
      </div>
    </div>
  );
}

export default WaitForAdminConfirmation;
