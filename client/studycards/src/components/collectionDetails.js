import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Typography, Button, Box, Divider, Container } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const CollectionDetails = ({ id, date, name, toggleDrawer }) => {
  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 30,
              mb: 0,
              mt: 3,
              fontWeight: "bold",
              flexWrap: "wrap",
            }}
            color="text.secondary"
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              mb: 1,
              fontWeight: "bold",
              flexWrap: "wrap",
            }}
            color="text.secondary"
          >
            Created on: {date}
          </Typography>
          <Divider variant="middle" />
          <Button
            variant="contained"
            color="error"
            onClick={() => toggleDrawer()}
            sx={{ mt: 3, mb: 2, width: "70%" }}
          >
            Delete Collection <DeleteOutlineIcon />
          </Button>
          <Button
            component={Link}
            to={`/flashcard/${id}`}
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, width: "70%" }}
          >
            Add Questions Cards <AddCircleOutlineIcon />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, width: "70%" }}
          >
            Open Cards <OpenInNewIcon />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CollectionDetails;
