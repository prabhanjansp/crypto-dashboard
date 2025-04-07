import React, { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { fetchMarketData } from "../services/cryptoAPI";
import CryptoCard from "./CryptoCard";
import {
  CircularProgress,
  Grid,
  Container,
  TextField,
  Pagination,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const getCoins = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchMarketData(page);
      setCoins(data);
      setError(null); // ✅ clear previous error if successful
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError("Failed to fetch cryptocurrency data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getCoins();
  }, [getCoins]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, coins]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        label="Search Cryptocurrency"
        fullWidth
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        placeholder="e.g. Bitcoin, Ethereum..."
      />

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {filteredCoins.length ? (
              filteredCoins.map((coin) => (
                <Grid item xs={12} sm={6} md={4} key={coin.id}>
                  <CryptoCard coin={coin} />
                </Grid>
              ))
            ) : (
              <Box sx={{ textAlign: "center", width: "100%", mt: 4 }}>
                No results found.
              </Box>
            )}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}

      {/* 🧯 Error Snackbar */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CryptoList;


