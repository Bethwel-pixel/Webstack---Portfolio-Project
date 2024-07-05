import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { userManagementClient } from "../../config";
import swal from "sweetalert";

const theme = createTheme();

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().when("isPassword", {
    is: true,
    then: yup.string().required("Password is required"),
  }),
  confirmPassword: yup.string().when("isPassword", {
    is: true,
    then: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!isPassword) {
        const response = await userManagementClient.post("/forgot_password", {
          username: values.username,
        });

        if (response.status === 200) {
          setIsPassword(true);
          sessionStorage.setItem("id", response.data.data);
        } else {
          swal("Error!", `${response.data.message}`, "error");
        }
      } else {
        const id = sessionStorage.getItem("id");
        const response = await userManagementClient.post(
          `/change_password/${id}`,
          {
            Password: values.password,
            Username: values.username,
          }
        );
        if (response.status === 200) {
          swal("Success!", `${response.data.data}`, "success");
          navigate("/");
        } else {
          swal("Error!", `${response.data.message}`, "error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      swal(
        "Error!",
        `${error.response?.data?.error || "Something went wrong!"}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 0,
            right: 0,
            bottom: 10,
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
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              Forgot Password
            </Typography>
            <Formik
              initialValues={{
                username: "",
                password: "",
                confirmPassword: "",
                isPassword: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  {isPassword && (
                    <>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {isPassword ? "Reset Password" : "Verify Username"}
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link component={RouterLink} to="/" variant="body2">
                        {"Remembered your password? Sign In"}
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
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ForgotPassword;
