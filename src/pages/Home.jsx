import React from "react";
import CryptoList from "../components/CryptoList";
import { Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔥 Top 10 Cryptocurrencies
      </Typography>
      <CryptoList />
    </Container>
  );
};

export default Home;
