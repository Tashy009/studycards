import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CollectionDetails from "./collectionDetails";
import { useGlobalContext } from "../contextAPI/appContext";
import { Grid } from "@mui/material";
import moment from "moment";
import Loading from "./Loading";
import DeleteAlertDialog from "./Modal";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F6D9F6" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mt: "0px",
      mb: "0px",
      transform: "scale(1.4)",
      color: "secondary.main",
      fontSize: "1.5rem",
    }}
  >
    •
  </Box>
);

const CollectionCard = () => {
  const { isLoading, collections, deleteCollection, fetchCollections } =
    useGlobalContext();
  console.log(collections);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [ctn, setCtn] = useState({ id: "", cname: "", cdate: "" });
  console.log(ctn);
  const toggleDrawer = (id, name, date) => () => {
    setCtn({ ...ctn, id: id, cname: name, cdate: date });
    setOpenDrawer((prev) => !prev);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const toggleDrawerAndDelete = () => () => {
    setOpenDrawer((prev) => !prev);
    setOpenDelete((prev) => !prev);
  };

  const handleDelete = () => {
    deleteCollection(ctn.id);
    setOpenDelete(false);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <Grid container justifyContent="center">
        <Loading type="bars" color="#F4C5F4" />
      </Grid>
    );
  }

  return (
    <>
      <DeleteAlertDialog
        openDel={openDelete}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          maxWidth: "100%",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {collections.map((collection, idx) => {
          const { _id: id, name, createdAt } = collection;
          let date = moment(createdAt);
          date = date.format("MMMM Do, YYYY");
          return (
            /*  <Container fixed> */
            <Grid
              key={idx}
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                raise="true"
                sx={{
                  maxWidth: { xs: 210, md: 210, lg: 250 },
                  width: "100%",
                  transform: "scale(1.1)",
                  borderRadius: 4,
                  boxShadow: 4,
                  marginBottom: 4,
                  marginRight: 2,
                  bgcolor: "#F6D9F6",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    mb: 1,
                    mt: 0,
                  }}
                >
                  {bull}
                  <Typography
                    sx={{
                      fontSize: 20,
                      mb: 1,
                      mt: 3,
                      fontWeight: "bold",
                      flexWrap: "wrap",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {name}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: 4,
                      /* "&:hover": {
                      color: "white",
                      backgroundColor: "secondary.main",
                      transform: "scaleX(1.2)",
                      borderRadius: 2,
                    }, */
                    }}
                    onClick={toggleDrawer(id, name, date)}
                  >
                    Open
                  </Button>
                </CardActions>
              </Card>

              <SwipeableDrawer
                anchor="bottom"
                open={openDrawer}
                onClose={toggleDrawer(id, name, date)}
                onOpen={toggleDrawer(id, name, date)}
                disableSwipeToOpen={true}
              >
                <StyledBox
                  sx={{
                    top: -56,
                    visibility: "visible",
                    right: 0,
                    left: 0,
                  }}
                >
                  <Puller />
                  <CollectionDetails
                    id={ctn.id}
                    date={ctn.cdate}
                    name={ctn.cname}
                    toggleDrawer={toggleDrawerAndDelete()}
                  />
                </StyledBox>
              </SwipeableDrawer>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CollectionCard;
