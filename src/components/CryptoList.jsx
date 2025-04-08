// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { debounce } from "lodash";
// import { fetchMarketData } from "../services/cryptoAPI";
// import CryptoCard from "./CryptoCard";
// import {
//   CircularProgress,
//   Grid,
//   Container,
//   TextField,
//   Pagination,
//   Box,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// AdvancedFilter


// const CryptoList = () => {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [error, setError] = useState(null);

//   const getCoins = useCallback(async () => {
//     setLoading(true);
//     try {
//       const { data } = await fetchMarketData(page);
//       setCoins(data);
//       setError(null); // ✅ clear previous error if successful
//     } catch (err) {
//       console.error("Error fetching crypto data:", err);
//       setError("Failed to fetch cryptocurrency data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   useEffect(() => {
//     getCoins();
//   }, [getCoins]);

//   const debouncedSearch = useCallback(
//     debounce((value) => {
//       setSearchTerm(value);
//     }, 300),
//     []
//   );

//   const handleSearchChange = (e) => {
//     debouncedSearch(e.target.value);
//   };

//   const filteredCoins = useMemo(() => {
//     return coins.filter((coin) =>
//       coin.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, coins]);

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const handleCloseSnackbar = () => {
//     setError(null);
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <TextField
//         label="Search Cryptocurrency"
//         fullWidth
//         onChange={handleSearchChange}
//         sx={{ mb: 3 }}
//         placeholder="e.g. Bitcoin, Ethereum..."
//       />

//       {loading ? (
//         <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
//       ) : (
//         <>
//           <Grid container spacing={2} justifyContent="center">
//             {filteredCoins.length ? (
//               filteredCoins.map((coin) => (
//                 <Grid item xs={12} sm={6} md={4} key={coin.id}>
//                   <CryptoCard coin={coin} />
//                 </Grid>
//               ))
//             ) : (
//               <Box sx={{ textAlign: "center", width: "100%", mt: 4 }}>
//                 No results found.
//               </Box>
//             )}
//           </Grid>

//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={10}
//               page={page}
//               onChange={handlePageChange}
//               color="primary"
//             />
//           </Box>
//         </>
//       )}

//       {/* 🧯 Error Snackbar */}
//       <Snackbar
//         open={Boolean(error)}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default CryptoList;


// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { debounce } from "lodash";
// import { fetchMarketData } from "../services/cryptoAPI";
// import CryptoCard from "./CryptoCard";
// import AdvancedFilter from "./AdvancedFilter";
// import {
//   CircularProgress,
//   Grid,
//   Container,
//   TextField,
//   Pagination,
//   Box,
//   Snackbar,
//   Alert,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
//   Chip,
//   Fade,
//   Stack,
//   styled
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";

// const CustomAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[1],
//   borderRadius: theme.shape.borderRadius,
//   overflow: "hidden",
//   '&:before': {
//     display: 'none'
//   },
//   '&.Mui-expanded': {
//     margin: 0,
//   },
// }));

// const CryptoList = () => {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     price: [0, 100000],
//     marketCap: [0, 1_000_000_000_000],
//     volume: [0, 1_000_000_000_000],
//   });

//   const defaultFilters = {
//     price: [0, 100000],
//     marketCap: [0, 1_000_000_000_000],
//     volume: [0, 1_000_000_000_000],
//   };

//   const isFilterActive = useMemo(() => {
//     return (
//       JSON.stringify(filters) !== JSON.stringify(defaultFilters)
//     );
//   }, [filters]);

//   const resetFilters = () => {
//     setFilters(defaultFilters);
//   };

//   const getCoins = useCallback(async () => {
//     setLoading(true);
//     try {
//       const { data } = await fetchMarketData(page);
//       setCoins(data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching crypto data:", err);
//       setError("Failed to fetch cryptocurrency data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   useEffect(() => {
//     getCoins();
//   }, [getCoins]);

//   const debouncedSearch = useCallback(
//     debounce((value) => {
//       setSearchTerm(value);
//     }, 300),
//     []
//   );

//   const handleSearchChange = (e) => {
//     debouncedSearch(e.target.value);
//   };

//   const handleApplyFilters = () => {};

//   const filteredCoins = useMemo(() => {
//     return coins.filter((coin) => {
//       const price = coin.current_price || 0;
//       const marketCap = coin.market_cap || 0;
//       const volume = coin.total_volume || 0;

//       return (
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         price >= filters.price[0] &&
//         price <= filters.price[1] &&
//         marketCap >= filters.marketCap[0] &&
//         marketCap <= filters.marketCap[1] &&
//         volume >= filters.volume[0] &&
//         volume <= filters.volume[1]
//       );
//     });
//   }, [coins, searchTerm, filters]);

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const handleCloseSnackbar = () => {
//     setError(null);
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <TextField
//         label="Search Cryptocurrency"
//         fullWidth
//         onChange={handleSearchChange}
//         sx={{ mb: 3 }}
//         placeholder="e.g. Bitcoin, Ethereum..."
//       />

//       <Box mb={3}>
//         <CustomAccordion TransitionComponent={Fade} elevation={1}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="filter-content"
//             id="filter-header"
//             sx={{ minHeight: 48 }}
//           >
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <FilterAltIcon />
//               <Typography variant="subtitle1" fontWeight="bold">
//                 Advanced Filters
//               </Typography>
//               {isFilterActive && <Chip label="Filters Applied" color="primary" size="small" />}
//             </Stack>
//           </AccordionSummary>
//           <AccordionDetails>
//             <AdvancedFilter
//               filters={filters}
//               setFilters={setFilters}
//               onApply={handleApplyFilters}
//             />
//             <Box display="flex" justifyContent="flex-end" mt={2}>
//               <Button variant="outlined" onClick={resetFilters} size="small">
//                 Reset Filters
//               </Button>
//             </Box>
//           </AccordionDetails>
//         </CustomAccordion>
//       </Box>

//       {loading ? (
//         <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
//       ) : (
//         <>
//           <Grid container spacing={2} justifyContent="center">
//             {filteredCoins.length ? (
//               filteredCoins.map((coin) => (
//                 <Grid item xs={12} sm={6} md={4} key={coin.id}>
//                   <CryptoCard coin={coin} />
//                 </Grid>
//               ))
//             ) : (
//               <Box sx={{ textAlign: "center", width: "100%", mt: 4 }}>
//                 No results found.
//               </Box>
//             )}
//           </Grid>

//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={10}
//               page={page}
//               onChange={handlePageChange}
//               color="primary"
//             />
//           </Box>
//         </>
//       )}

//       <Snackbar
//         open={Boolean(error)}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default CryptoList;
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { fetchMarketData } from "../services/cryptoAPI";
import CryptoCard from "./CryptoCard";
import AdvancedFilter from "./AdvancedFilter";
import {
  CircularProgress,
  Grid,
  Container,
  TextField,
  Pagination,
  Box,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Chip,
  Fade,
  Stack,
  styled
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  '&:before': {
    display: 'none'
  }
}));

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    price: [0, 100000],
    marketCap: [0, 1_000_000_000_000],
    volume: [0, 1_000_000_000_000],
  });

  const defaultFilters = {
    price: [0, 100000],
    marketCap: [0, 1_000_000_000_000],
    volume: [0, 1_000_000_000_000],
  };

  const isFilterActive = useMemo(() => {
    return (
      JSON.stringify(filters) !== JSON.stringify(defaultFilters)
    );
  }, [filters]);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const getCoins = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchMarketData(page);
      setCoins(data);
      setError(null);
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
    return coins.filter((coin) => {
      const price = coin.current_price || 0;
      const marketCap = coin.market_cap || 0;
      const volume = coin.total_volume || 0;

      return (
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        price >= filters.price[0] &&
        price <= filters.price[1] &&
        marketCap >= filters.marketCap[0] &&
        marketCap <= filters.marketCap[1] &&
        volume >= filters.volume[0] &&
        volume <= filters.volume[1]
      );
    });
  }, [coins, searchTerm, filters]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  const handleAccordionChange = (_, isExpanded) => {
    setExpanded(isExpanded);
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

      <Box mb={expanded ? 3 : 0}>
        <CustomAccordion
          expanded={expanded}
          onChange={handleAccordionChange}
          disableGutters
          TransitionComponent={Fade}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="filter-content"
            id="filter-header"
            sx={{ minHeight: 48 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <FilterAltIcon />
              <Typography variant="subtitle1" fontWeight="bold">
                Advanced Filters
              </Typography>
              {isFilterActive && <Chip label="Filters Applied" color="primary" size="small" />}
            </Stack>
          </AccordionSummary>

          {expanded && (
            <AccordionDetails>
              <AdvancedFilter
                filters={filters}
                setFilters={setFilters}
                onApply={() => {}}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="outlined" onClick={resetFilters} size="small">
                  Reset Filters
                </Button>
              </Box>
            </AccordionDetails>
          )}
        </CustomAccordion>
      </Box>

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


