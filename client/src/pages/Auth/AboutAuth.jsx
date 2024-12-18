import React from "react";

const AboutAuth = () => {
  return (
    <div className="hidden max-w-lg p-8 mb-8 bg-white shadow-lg rounded-lg border border-gray-200 md:block">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800">
        Welcome to <span className="text-blue-400">DevQnA!</span>
      </h1>
      <ul className="space-y-4 text-base text-gray-700">
        <li className="flex items-center">
          <span className="mr-3 text-gray-500">&#10003;</span>
          <span>Have a question? Ask it and get simple, helpful answers!</span>
        </li>
        <li className="flex items-center">
          <span className="mr-3 text-gray-500">&#10003;</span>
          <span>Find solutions that make your coding journey smoother.</span>
        </li>
        <li className="flex items-center">
          <span className="mr-3 text-gray-500">&#10003;</span>
          <span>Explore a friendly space for clear and easy Q&A.</span>
        </li>
        <li className="flex items-center text-sm text-gray-600">
          <span className="mr-3 text-gray-500">&#10003;</span>
          <span>
            Start now and make problem-solving effortless with DevQnA!
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AboutAuth;
