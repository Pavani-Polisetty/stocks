import axios from "axios";

const API_URL = "https://stocks-1-b7q2.onrender.com/api/dashboard";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};