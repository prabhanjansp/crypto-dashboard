import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY // Make sure to set this in your .env file 
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
