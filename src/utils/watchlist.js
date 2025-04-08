// utils/watchlist.js
export const getWatchlist = () => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  };
  
  export const toggleWatchlistCoin = (coinId) => {
    const current = getWatchlist();
    const updated = current.includes(coinId)
      ? current.filter(id => id !== coinId)
      : [...current, coinId];
    localStorage.setItem("watchlist", JSON.stringify(updated));
    return updated;
  };
  