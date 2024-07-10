import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(6),
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Legal Service Management
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Legal Service Management
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Streamline your legal services with our comprehensive management
              system. Manage cases, clients, documents, and billing all in one
              place.
            </Typography>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/login")} // Navigate to /login
              >
                Get Started
              </Button>
            </Box>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.card} elevation={3}>
                <Box p={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Case Management
                  </Typography>
                  <Typography>
                    Organize and track cases efficiently with all relevant
                    information accessible and up-to-date.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.card} elevation={3}>
                <Box p={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Client Management
                  </Typography>
                  <Typography>
                    Manage client information with a centralized repository for
                    all client-related data.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.card} elevation={3}>
                <Box p={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Document Management
                  </Typography>
                  <Typography>
                    Securely store, retrieve, and share legal documents with
                    ease.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.card} elevation={3}>
                <Box p={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Task Management
                  </Typography>
                  <Typography>
                    Create, assign, and monitor tasks to ensure timely
                    completion.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className={classes.card} elevation={3}>
                <Box p={2}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Billing and Invoicing
                  </Typography>
                  <Typography>
                    Automate billing processes and track payments efficiently.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Legal Service Management
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Streamline your legal workflow today!
          </Typography>
        </Container>
      </footer>
      {/* End footer */}
    </div>
  );
};

export default LandingPage;
