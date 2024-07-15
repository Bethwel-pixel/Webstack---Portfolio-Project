import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import meinInSuits from "../../Assets/Images/MenInSuits.jpg";
import { getAllUsers, loginCallApi } from "../../api/userservice";
import swal from "sweetalert";
import { jwtDecode } from "jwt-decode";
import { userManagementClient } from "../../config";

function saveTokenToStorage(decodedToken) {
  localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
}

async function saveDataToLocalStorage(response) {
  const token = response.data.token;
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("rights", JSON.stringify(response.data.rights));
  const decodedToken = jwtDecode(token);
  saveTokenToStorage(decodedToken);
}

function SignInSide({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [menuItemes, setMenuItems] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const Username = formData.get("Username");
      const password = formData.get("password");

      // Save username and password in session storage
      const response = await loginCallApi(Username, password);

      if (response.status === 401) {
        swal("Error!", `${response.data.message}`, "error");
      } else if (response.status === 500) {
        swal("Error!", `${response.data.message}`, "error");
      } else if (response.status === 200) {
        const Username = formData.get("Username");
        sessionStorage.setItem("username", Username);
        if (onLogin) {
          onLogin(Username);
        }
        navigate("/super-admin-dashboard");
      } else {
        swal("Error!", "Check Network Connectivity", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      swal("Error!", "An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <PulseLoader size={15} color={"#3f51b5"} />
        </Box>
      )}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${meinInSuits})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Username"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="HashedPassword"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit" href="https://mui.com/">
                    Legal Management
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
