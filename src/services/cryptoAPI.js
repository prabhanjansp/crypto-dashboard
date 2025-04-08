import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

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

export const fetchCoinDetail = async (id) =>{
  const { data } = await   API.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  })
  return data;
}
;

export const fetchHistoricalData = async (id, days = 30) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: days,
      },
    }
  );
  return data.prices;
};
