import axios from "axios";

const API_URL = "https://stocks-p0sy.onrender.com";

// Buy Stock
export const buyStock = async (stockData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/buy`,
    stockData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get Portfolio
export const getPortfolio = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};