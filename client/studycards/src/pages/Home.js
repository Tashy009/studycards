import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { useGlobalContext } from "../contextAPI/appContext";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {/*  <Link color="inherit" href="https://github.com/Tashy009">
        Tashy
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const { user, showLogOutAlert } = useGlobalContext();
  return (
    <ThemeProvider theme={theme}>
      {showLogOutAlert && (
        <Alert message="LogOut successfully" severity="success" />
      )}
      {user && <Navigate to="/dashboard" />}
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "70vh",
            overflow: "auto",
            alignItems: "center",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="secondary.main"
              gutterBottom
            >
              StudyCard
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              The flashcards that let you study with ease. Craete a collection
              of flashcards while reading. Study with the cards you create
              before your exams or interviews.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={"/signin"}
              >
                Sign In
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to={"/signup"}
              >
                sign up
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Made with love by Tashy
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </main>
    </ThemeProvider>
  );
}
