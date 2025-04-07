// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://api.coingecko.com/api/v3",
// });

// export const fetchMarketData = (page = 1, perPage = 10) =>
//   API.get("/coins/markets", {
//     params: {
//       vs_currency: "usd",
//       order: "market_cap_desc",
//       per_page: perPage,
//       page,
//       sparkline: false,
//     },
//   });

import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

/**
 * Fetches top cryptocurrencies market data
 * 
 * @param {number} page - The current page number
 * @param {number} perPage - Number of results per page
 * @returns {Promise} Axios response containing market data
 */
export const fetchMarketData = (page = 1, perPage = 10) =>
  API.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page,
      sparkline: false,
    },
  });

/**
 * Fetches detailed data for a specific coin
 * 
 * @param {string} id - The coin ID (e.g., 'bitcoin', 'ethereum')
 * @returns {Promise} Axios response containing detailed coin data
 */
export const fetchCoinDetail = (id) =>
  API.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
