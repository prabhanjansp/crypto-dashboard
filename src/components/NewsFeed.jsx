import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
  Box,
  CircularProgress,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchCryptoNews } from "../services/newsAPI";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 6;

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoNews(page, pageSize);
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [page]);

  const handlePageChange = (_, value) => setPage(value);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h5" gutterBottom>
        📰 Latest Crypto News
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
              mt: 2,
            }}
          >
            {articles.map((article, index) => (
              <Card
                key={index}
                elevation={6}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                {article.urlToImage ? (
                  <CardMedia
                    component="img"
                    image={article.urlToImage}
                    alt={article.title}
                    height="160"
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    height="160px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="grey.200"
                  >
                    <Typography variant="body2" color="text.secondary">
                      No Image
                    </Typography>
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {article.title?.length > 75
                      ? article.title.slice(0, 75) + "..."
                      : article.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {article.description
                      ? article.description.slice(0, 100) + "..."
                      : "No description available."}
                  </Typography>

                  <Box mt={2}>
                    <Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ fontWeight: 500 }}
                    >
                      Read More →
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(totalResults / pageSize)}
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
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewsFeed;
