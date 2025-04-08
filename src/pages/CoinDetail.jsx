// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchCoinDetail } from "../services/cryptoAPI";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
// } from "@mui/material";

// const CoinDetail = () => {
//   const { id } = useParams();
//   const [coin, setCoin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getCoin = async () => {
//       try {
//         const { data } = await fetchCoinDetail(id);
//         setCoin(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getCoin();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Card>
//         <CardContent>
//           <Typography variant="h4" gutterBottom>
//             {coin.name} ({coin.symbol.toUpperCase()})
//           </Typography>
//           <Typography variant="body1" dangerouslySetInnerHTML={{ __html: coin.description.en?.split(". ")[0] + "." }} />
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
//           </Typography>
//           <Typography variant="h6">
//             Market Cap Rank: #{coin.market_cap_rank}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default CoinDetail;
// src/pages/CoinDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, Container, CircularProgress } from "@mui/material";
import CoinChart from "../components/CoinChat";
import { fetchCoinDetail } from "../services/cryptoAPI";


const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoin = async () => {
      try {
        const data = await fetchCoinDetail(id);
        setCoin(data);
      } catch (error) {
        console.error("Failed to load coin details", error);
      } finally {
        setLoading(false);
      }
    };
    loadCoin();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {coin?.name} ({coin?.symbol?.toUpperCase()})
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {coin?.description?.en?.split(". ")[0]}
      </Typography>

      {/* Chart Section */}
      <Box mt={4}>
        <CoinChart coinId={id} />
      </Box>
    </Container>
  );
};

export default CoinDetail;
