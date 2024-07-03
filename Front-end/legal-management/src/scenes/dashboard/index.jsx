import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { getAllUsers } from "../../api/userservice";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { format } from "date-fns";
import GeographyChart from "../../components/GeographyChart";
import { Cases } from "@mui/icons-material";

const Dashboard = () => {
  const base_url = "individualclients";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [indiv, setIndiv] = useState([]);
  const [cases, setCases] = useState([]);
  const [recentCases, setrecentCases] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [error, setError] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    fetchIndividualClients();
    fetchRecentCases();
    fetchCases();
  }, [base_url, refreshTable]);

  const fetchIndividualClients = async () => {
    try {
      const response = await getAllUsers(`${base_url}`);
      setIndiv(response.data.length);
    } catch (err) {
      setError(err);
    }
  };

  const fetchCases = async () => {
    try {
      const response = await getAllUsers("cases");
      setCases(response.data.length);
      setCaseData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchRecentCases = async () => {
    try {
      const response = await getAllUsers("recentcases");
      setrecentCases(response.data);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SHERIAPRO DASHBOARD"
          subtitle="Welcome to SheriaPro Dashboard"
        />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download  Cases Reports
          </Button> */}
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={cases}
            subtitle="Cases"
            progress="0.75"
            increase="+14%"
            icon={
              <WorkHistoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={recentCases.length}
            subtitle={"Corprate Clients"}
            progress="0.50"
            increase="+21%"
            icon={
              <GroupAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            sx={{
              "& .MuiTypography-root": {
                fontSize: isSmallScreen ? "0.75rem" : "1rem",
              },
            }}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={indiv}
            subtitle="Individual Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <GroupAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            sx={{
              "& .MuiTypography-root": {
                fontSize: isSmallScreen ? "0.75rem" : "1rem",
              },
            }}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={recentCases.length}
            subtitle="New Clients"
            progress="0.80"
            increase="+43%"
            icon={
              <GroupAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            sx={{
              "& .MuiTypography-root": {
                fontSize: isSmallScreen ? "0.75rem" : "1rem",
              },
            }}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="500"
                color={colors.grey[100]}
                sx={{ fontSize: isSmallScreen ? "0.2rem" : "1rem" }}
              >
                Case Events
              </Typography>
              {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                sx={{ fontSize: isSmallScreen ? "1.5rem" : "2.5rem" }}
              >
                {cases}
              </Typography> */}
              <Box>
                <BarChart isDashboard />
              </Box>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          {/* <Box sx={{ height: "250px", margin: "0", overflow: "hidden" }}>
            <LineChart isDashboard={false} sx={{ height: "100%" }} />
          </Box> */}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Cases
            </Typography>
          </Box>
          {recentCases.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.description}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.created_at}</Box>
              {/* <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                KES {transaction.cost}
              </Box> */}
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Court Case
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {cases} Cases
            </Typography>
            <Typography>Includes extra cases </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Cases Dashboard
          </Typography>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Cases Based On Location
          </Typography>
          <Box height="200px">
            {/* <LineChart /> */}
            <GeographyChart isDashboard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
