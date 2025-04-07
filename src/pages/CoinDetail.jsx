import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetail } from "../services/cryptoAPI";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await fetchCoinDetail(id);
        setCoin(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {coin.name} ({coin.symbol.toUpperCase()})
          </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: coin.description.en?.split(". ")[0] + "." }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
          </Typography>
          <Typography variant="h6">
            Market Cap Rank: #{coin.market_cap_rank}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CoinDetail;
