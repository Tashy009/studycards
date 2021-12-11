import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useGlobalContext } from "../contextAPI/appContext";
import Link from "@mui/material/Link";

export default function Header() {
  const { user, logout } = useGlobalContext();
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          /* color="secondary" */
          sx={{ bgcolor: "secondary.main" }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              href="/"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link color="#fff" underline="none" href="/">
                StudyCard
              </Link>
            </Typography>
            <Button
              href="/signin"
              color="inherit"
              sx={{
                ...(user ? { display: "none" } : { display: "inline-block" }),
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => logout()}
              color="inherit"
              sx={{
                ...(user ? { display: "inline-block" } : { display: "none" }),
              }}
            >
              LogOut
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
