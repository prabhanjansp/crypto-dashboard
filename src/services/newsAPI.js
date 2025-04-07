import axios from "axios";

const API_KEY = "deebd35b1bb94d59935f55d62eb2c674"; 
const BASE_URL = "https://newsapi.org/v2/";

export const fetchCryptoNews = async (page = 1, pageSize = 6) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: "cryptocurrency",
          sortBy: "publishedAt",
          apiKey: API_KEY,
          page,
          pageSize,
          language: "en",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch crypto news");
    }
  };
