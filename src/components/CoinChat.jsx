// src/components/CoinChart.js
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { fetchHistoricalData } from "../services/cryptoAPI";
import { Skeleton, Box } from "@mui/material";

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        const data = await fetchHistoricalData(coinId, 30);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [coinId]);

  const option = {
    title: {
      text: "Price (Last 30 Days)",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: chartData.map(item => new Date(item[0]).toLocaleDateString()),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: chartData.map(item => item[1]),
        type: "line",
        smooth: true,
        areaStyle: {},
        name: "Price",
      },
    ],
  };

  return (
    <Box mt={5}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          animation="wave" // 👈 wavy effect here
        />
      ) : (
        <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
      )}
    </Box>
  );
};

export default CoinChart;
