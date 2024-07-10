import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Badge,
  Stack,
  Popover,
  List,
  ListItem,
  Typography,
  Divider,
  ListItemText,
  Modal,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsModeOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const userName = JSON.parse(sessionStorage.user);

    async function fetchAllData() {
      try {
        if (isMounted) {
          const username = JSON.parse(sessionStorage.user);
          const notificationsResponse = await axios.get(
            `http://localhost:5000/notifications/${username}`
          ); // Update this with your actual notifications endpoint
          if (notificationsResponse.data) {
            setNotifications(notificationsResponse.data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(sessionStorage.user);
        const response = await axios.get(
          `http://localhost:5000/data/${userId}`
        );
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (profileAnchorEl) {
      fetchUserData();
    }
  }, [profileAnchorEl]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleProfileClick = async (event) => {
    setProfileAnchorEl(profileAnchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const profileOpen = Boolean(profileAnchorEl);
  const id = open ? "simple-popover" : undefined;
  const profileId = profileOpen ? "profile-popover" : undefined;

  return (
    <Box
      display="flex"
      justifyContent={isSmallScreen ? "space-evenly" : "space-between"}
      p={2}
    >
      <Box
        display="flex"
        backgroundColor={colors.grey[800]}
        borderRadius="3px"
      ></Box>
      <Stack spacing={2} direction="row">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton aria-describedby={id} onClick={handleNotificationClick}>
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsModeOutlinedIcon color="action" />
          </Badge>
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
        </IconButton>
        <IconButton aria-describedby={profileId} onClick={handleProfileClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          p={2}
          sx={{
            width: "300px",
            borderRadius: "0.75rem",
            bgcolor:
              theme.palette.mode === "light"
                ? colors.blueAccent[900]
                : colors.grey[600],
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: colors.greenAccent[400],
            }}
            variant="h6"
          >
            Notifications
          </Typography>
          <List>
            {notifications?.map((notification) => (
              <div key={notification.id}>
                <ListItem>
                  <ListItemText primary={notification.description} />
                </ListItem>
                <Divider sx={{ color: colors.redAccent[400] }} />
              </div>
            ))}
            {/* :<Typography> you have No New notifications</Typography> */}
            {/* <List>
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            </List> */}
          </List>
        </Box>
      </Popover>
      <Popover
        id={profileId}
        open={profileOpen}
        anchorEl={profileAnchorEl}
        onClose={() => setProfileAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          p={2}
          sx={{
            width: "300px",
            borderRadius: "0.75rem",
            bgcolor:
              theme.palette.mode === "light"
                ? colors.blueAccent[900]
                : colors.grey[600],
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: colors.greenAccent[400],
            }}
            variant="h6"
          >
            User Details
          </Typography>
          {/* {user?.map((users) => (
              <div key={users.id}>
                <ListItem>
                  <ListItemText primary={users.First_name} />
                </ListItem>
                <Divider sx={{ color: colors.redAccent[400] }} />
              </div>
            ))} */}
          {user ? (
            <>
              <Typography sx={{ mt: 2 }}>
                <strong>Username:</strong> {user.User_name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Email:</strong> {user.User_email}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>First Name:</strong> {user.First_name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Last Name:</strong> {user.Last_name}
              </Typography>
              {/* <Typography sx={{ mt: 2 }}>
                <strong>Status:</strong> {user.status}
              </Typography> */}
            </>
          ) : (
            <Typography sx={{ mt: 2 }}>Loading user details...</Typography>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
