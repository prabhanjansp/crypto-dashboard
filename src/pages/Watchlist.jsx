// pages/Watchlist.jsx
import React, { useEffect, useState } from "react";
import { getWatchlist } from "../utils/watchlist";
import axios from "axios";
import CryptoCard from "../components/CryptoCard";

const Watchlist = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      const ids = getWatchlist();
      if (!ids.length) {
        setCoins([]);
        return;
      }
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: "usd",
            ids: ids.join(","),
          },
        }
      );
      setCoins(data);
    };

    fetchWatchlistCoins();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
      {coins.length === 0 ? (
        <p>No coins in watchlist.</p>
      ) : (
        coins.map((coin) => <CryptoCard key={coin.id} coin={coin} />)
      )}
    </div>
  );
};

export default Watchlist;
