// import React from "react";
// import { Card, CardContent, Typography, Avatar } from "@mui/material";
// import { Link } from "react-router-dom";

// const CryptoCard = React.memo(({ coin }) => (
//   <Card
//     sx={{ minWidth: 275, display: "flex", alignItems: "center", p: 2, m: 1 }}
//   >
//     <Avatar
//       src={coin.image}
//       alt={coin.name}
//       sx={{ width: 56, height: 56, mr: 2 }}
//     />
//     <CardContent>
//       <Link
//         to={`/coin/${coin.id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <Typography variant="h6">{coin.name}</Typography>
//         <Typography color="textSecondary">
//           ${coin.current_price.toLocaleString()}
//         </Typography>
//       </Link>
//     </CardContent>
//   </Card>
// ));

// export default CryptoCard;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";

const CryptoCard = React.memo(({ coin }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Check if the coin is already in the watchlist
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsSaved(savedList.includes(coin.id));
  }, [coin.id]);

  // Toggle function
  const toggleWatchlist = () => {
    const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    let updatedList;

    if (savedList.includes(coin.id)) {
      updatedList = savedList.filter((id) => id !== coin.id);
    } else {
      updatedList = [...savedList, coin.id];
    }

    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    setIsSaved(!isSaved);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        m: 1,
      }}
    >
      <Link
        to={`/coin/${coin.id}`}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
          flexGrow: 1,
        }}
      >
        <Avatar
          src={coin.image}
          alt={coin.name}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6">{coin.name}</Typography>
          <Typography color="textSecondary">
            ${coin.current_price.toLocaleString()}
          </Typography>
        </CardContent>
      </Link>

      <Tooltip title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}>
        <IconButton onClick={toggleWatchlist} color="primary">
          {isSaved ? <Star /> : <StarBorder />}
        </IconButton>
      </Tooltip>
    </Card>
  );
});

export default CryptoCard;
