import axios from "axios";

const API_URL = "https://stocks-p0sy.onrender.com";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};