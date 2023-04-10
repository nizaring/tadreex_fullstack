import React from 'react';

const Contact = () => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-gray-800 p-2">
      <a href="https://m.facebook.com/tadreex/?ref=page_internal" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
        <i className="fab fa-facebook fa-2x"></i>
      </a>
      <a href="https://www.instagram.com/tadreex/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
        <i className="fab fa-instagram fa-2x"></i>
      </a>
      <a href="https://www.youtube.com/channel/UCVnY1gL96JMVb9rzUAcvbvA" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
        <i className="fab fa-youtube fa-2x"></i>
      </a>
      <a href="https://wa.me/21650480027" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
        <i className="fab fa-whatsapp fa-2x"></i>
      </a>
      <a href="https://www.linkedin.com/company/tadreex/?originalSubdomain=tn" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900">
        <i className="fab fa-linkedin fa-2x"></i>
      </a>
    </div>
  );
};

export default Contact;
