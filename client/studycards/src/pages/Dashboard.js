import * as React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Alertbar from "../components/Alert";
import { useGlobalContext } from "../contextAPI/appContext";
import CollectionCard from "../components/collectionCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CollectionFormDialog from "../components/CollectionForm";

const Dashboard = () => {
  const [collectionModal, setCollectionModal] = useState(false);
  const {
    user,
    showAlert,
    fetchCollections,
    createCollection,
    showError,
    showCtnAlert,
  } = useGlobalContext();
  /* console.log(showError); */

  const [showCtnError, setShowCtnError] = useState(showError);

  const [value, setValue] = useState({ name: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setCollectionModal(false);
  };

  const handleSubmit = (e) => {
    const { name } = value;
    if (name) {
      createCollection(value);
      setValue({ name: "" });
    } else {
      createCollection(value);
      setShowCtnError(true);
      console.log(showCtnError);
    }
    setCollectionModal(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  /*  console.log(user); */
  return (
    <>
      <Header />
      {showAlert && (
        <Alertbar
          open={showAlert}
          message="SignUp successful"
          severity="success"
        />
      )}
      {showCtnAlert && (
        <Alertbar
          open={showCtnAlert}
          message="Collection created sucessfully"
          severity="success"
        />
      )}
      {showCtnError && (
        <Alertbar
          open={showCtnError}
          message="Error occured, Name cannot be empty and must be unique"
          severity="error"
        />
      )}
      <CollectionFormDialog
        openMode={collectionModal}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: ["1.5rem", "2rem", "2rem"],
                textAlign: "right",
                fontWeight: "bold",
                alignItems: "center",
                top: "50%",
              }}
            >
              Hello {user},
            </Typography>
          </Container>
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: ["1.5rem", "2rem", "2rem"],
                textAlign: "center",
                fontWeight: "bold",
                alignItems: "center",
                borderBottom: "6px solid",
                borderColor: "secondary.main",
                mt: 4,
                mb: 4,
              }}
            >
              Your Collection(s)
            </Typography>
            <CollectionCard />
          </Container>
          <Fab
            sx={{ bottom: 20, right: 20, position: "fixed" }}
            aria-label="Add"
            color="secondary"
            onClick={() => setCollectionModal((prev) => !prev)}
          >
            <AddIcon />
          </Fab>
        </Container>
      </Box>
    </>
  );
};
export default Dashboard;
