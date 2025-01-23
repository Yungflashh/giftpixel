import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Pie, Line, Bar, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  RadialLinearScale,
  Title,
} from "chart.js";
import "../../styles/Analytics.css";
import { useNavigate } from "react-router-dom";

// Register necessary components for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  RadialLinearScale,
  Title
);

const GetShareLinkAnalytics = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [radarData, setRadarData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [topDate, setTopDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      const promiseTitleId = Cookies.get("promiseId");

      if (!promiseTitleId) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          `https://giftpixel.onrender.com/api/auth/analytics/${promiseTitleId}`
        );
        if (response.data.success) {
          const analytics = response.data.analytics;

          // Device Category Distribution
          const deviceCategories = analytics.reduce((acc, item) => {
            const category = item.deviceCategory;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});

          const pieLabels = Object.keys(deviceCategories);
          const pieData = Object.values(deviceCategories);

          setChartData({
            labels: pieLabels,
            datasets: [
              {
                data: pieData,
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 205, 86, 0.6)",
                  "rgba(201, 203, 207, 0.6)",
                ],
                hoverBackgroundColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 205, 86, 1)",
                  "rgba(201, 203, 207, 1)",
                ],
                borderWidth: 1,
                borderColor: "#fff",
              },
            ],
          });

          // Clicks Over Time
          const dailyClicks = analytics.reduce((acc, item) => {
            const date = item.timestamp.split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});

          const dates = Object.keys(dailyClicks);
          const clicks = Object.values(dailyClicks);

          setLineChartData({
            labels: dates,
            datasets: [
              {
                label: "Clicks Over Time",
                data: clicks,
                borderColor: "#4BC0C0",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4, // Smooth curves
              },
            ],
          });

          // Top Performing Date
          const topDateData = Object.entries(dailyClicks).reduce(
            (acc, [date, count]) => {
              if (count > acc.count) {
                acc = { date, count };
              }
              return acc;
            },
            { date: "", count: 0 }
          );

          setTopDate(topDateData);

          // Bar Chart
          setBarChartData({
            labels: pieLabels,
            datasets: [
              {
                label: "Device Category Count",
                data: pieData,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });

          // Radar Chart
          setRadarData({
            labels: pieLabels,
            datasets: [
              {
                label: "Device Category Performance",
                data: pieData,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "#FF6384",
                borderWidth: 1,
              },
            ],
          });

          // Doughnut Chart
          setDoughnutData({
            labels: pieLabels,
            datasets: [
              {
                data: pieData,
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 205, 86, 0.6)",
                  "rgba(201, 203, 207, 0.6)",
                ],
              },
            ],
          });
        } else {
          console.log("Failed to retrieve analytics");
        }
      } catch (error) {
        console.error("Error retrieving share link analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      {/* Back Button */}
      <button 
        className="back-button"
        onClick={() => navigate("/promiseList")}
      >
        Back
      </button>

      <div className="analytics-grid">
        {/* Top Performing Date */}
        {topDate.date && (
          <div className="top-performing-date">
            <h3>Top Performing Date</h3>
            <p>{topDate.date}</p>
            <p id="clicks">{topDate.count} clicks</p>
          </div>
        )}

        {/* Chart: Clicks Over Time */}
        <div className="chart-container">
          <h2>Clicks Over Time</h2>
          {lineChartData.labels ? <Line data={lineChartData} /> : <p>Loading...</p>}
        </div>

        {/* Chart: Device Category Distribution (Pie) */}
        <div className="chart-container">
          <h2>Device Category Distribution (Pie)</h2>
          {chartData.labels ? <Pie data={chartData} /> : <p>Loading...</p>}
        </div>

        {/* Chart: Device Category Distribution (Bar) */}
        <div className="chart-container move-up">
          <h2>Device Category Distribution (Bar)</h2>
          {barChartData.labels ? <Bar data={barChartData} /> : <p>Loading...</p>}
        </div>

        {/* Chart: Device Category Performance (Radar) */}
        <div className="chart-container">
          <h2>Device Category Performance (Radar)</h2>
          {radarData.labels ? <Radar data={radarData} /> : <p>Loading...</p>}
        </div>

        {/* Chart: Device Category Distribution (Doughnut) */}
        <div className="chart-container">
          <h2>Device Category Distribution (Doughnut)</h2>
          {doughnutData.labels ? <Doughnut data={doughnutData} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default GetShareLinkAnalytics;
