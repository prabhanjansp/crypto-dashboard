// src/components/AdvancedFilter.js
import React from "react";
import {
  Box,
  Typography,
  Slider,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const AdvancedFilter = ({ filters, setFilters, onApply }) => {
  const handleSliderChange = (key) => (_, newValue) => {
    setFilters((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleInputChange = (key) => (e) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      price: [0, 100000],
      marketCap: [0, 1000000000000],
      volume: [0, 1000000000000],
    });
    onApply();
  };

  return (
    <Box mt={2} p={2} border={1} borderRadius={2}>
      <Typography variant="h6" gutterBottom>
        Advanced Filters
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography>Price ($)</Typography>
          <Slider
            value={filters.price}
            onChange={handleSliderChange("price")}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography>Market Cap ($)</Typography>
          <Slider
            value={filters.marketCap}
            onChange={handleSliderChange("marketCap")}
            valueLabelDisplay="auto"
            min={0}
            max={1_000_000_000_000}
            step={1_000_000_000}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography>24h Volume ($)</Typography>
          <Slider
            value={filters.volume}
            onChange={handleSliderChange("volume")}
            valueLabelDisplay="auto"
            min={0}
            max={1_000_000_000_000}
            step={1_000_000_000}
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" onClick={onApply}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AdvancedFilter;
