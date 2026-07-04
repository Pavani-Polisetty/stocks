import axios from "axios";

const API_URL = "https://stocks-1-b7q2.onrender.com/api/stocks";

export const getAllStocks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};