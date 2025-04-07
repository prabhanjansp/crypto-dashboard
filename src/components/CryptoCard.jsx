import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const CryptoCard = React.memo(({ coin }) => (
  <Card
    sx={{ minWidth: 275, display: "flex", alignItems: "center", p: 2, m: 1 }}
  >
    <Avatar
      src={coin.image}
      alt={coin.name}
      sx={{ width: 56, height: 56, mr: 2 }}
    />
    <CardContent>
      <Link
        to={`/coin/${coin.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h6">{coin.name}</Typography>
        <Typography color="textSecondary">
          ${coin.current_price.toLocaleString()}
        </Typography>
      </Link>
    </CardContent>
  </Card>
));

export default CryptoCard;
