import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../assets/background.jpg";
import logo from "../assets/logo.svg";

const Register = () => {
  const [userData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.msg || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md bg-opacity-90">
        <div className="flex justify-center">
          <img src={logo} alt="Company Logo" className="h-16 mb-4" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Sign Up
        </h1>
        <p className="mt-2 text-center text-sm text-red-400">
          Note: Please wait a few moments for backend to start if this is your
          first time registering.
        </p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p>Already have an account?</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
