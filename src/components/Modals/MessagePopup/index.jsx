import React from 'react';

const Modal = ({ title, message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 rounded-full p-2">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-center text-lg font-semibold text-green-600 mb-2">{title}</h2>
        <p className="text-center text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="w-full mt-6 py-2 bg-indigo-600 text-white rounded-lg focus:outline-none hover:bg-indigo-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Modal;
