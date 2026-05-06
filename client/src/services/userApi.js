import { api } from "./api.js";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//Login user
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/users/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
