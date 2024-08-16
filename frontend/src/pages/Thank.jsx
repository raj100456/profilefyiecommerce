import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const Thank = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-4">
            Thank You for Shopping!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6">
            We appreciate your business and hope to see you again soon.
          </p>
          <NavLink to="/home">
            <button className="uppercase bg-green-600 p-3 px-6 sm:px-8 lg:px-10 rounded-lg text-white mt-4 sm:mt-6 font-semibold tracking-wider hover:bg-purple-50 duration-300 transition-all ease-in hover:text-green-600 border-2 border-green-600">
              Shop Now
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Thank;
