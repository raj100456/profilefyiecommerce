import axios from "axios";

const API_URL = "https://profilefyiecommerce.onrender.com/api/auth";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw (
      (error.response && error.response.data) || { msg: "An error occurred" }
    );
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw (
      (error.response && error.response.data) || { msg: "An error occurred" }
    );
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
