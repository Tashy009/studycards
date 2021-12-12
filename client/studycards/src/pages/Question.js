import * as React from "react";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../contextAPI/appContext";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "../components/Header";

import Alert from "../components/Alert";
import Loading from "../components/Loading";

const theme = createTheme();

export default function Question() {
  const { id } = useParams();
  const {
    user,
    isAuthenticated,
    isLoading,
    errorMsg,
    showError,
    fetchSingleCollection,
    collection,
    createFlashCard,
  } = useGlobalContext();
  useEffect(() => {
    fetchSingleCollection(id);
  }, []);

  console.log(user);
  console.log(isAuthenticated);
  console.log(collection);

  const [cardValues, setCardValues] = useState([{ question: "", answer: "" }]);
  let ctn = collection.map((item) => {
    return item.name;
  });
  console.log(ctn);

  const addCard = () => {
    setCardValues([...cardValues, { question: "", answer: "" }]);
  };

  const removeCard = (index) => {
    const newCardValues = cardValues.filter((_, i) => i !== index);
    setCardValues(newCardValues);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newCardValues = [...cardValues];
    newCardValues[index][name] = value;
    setCardValues(newCardValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCardValues = cardValues.map((card) => ({
      question: card.question,
      answer: card.answer,
    }));
    newCardValues.map((card) => {
      return createFlashCard(id, card);
    });

    console.log(newCardValues);
  };

  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated === false && <Navigate to="/" />}
      <CssBaseline />
      <Header />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add questions cards to {ctn}
          </Typography>

          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {cardValues.map((card, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      onChange={(e) => handleChange(e, index)}
                      required
                      fullWidth
                      name="question"
                      id="standard-multiline-static"
                      label="Question"
                      multiline
                      rows={4}
                      variant="filled"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                      name="answer"
                      id="standard-multiline-static"
                      label="Possible Answers"
                      multiline
                      rows={4}
                      variant="filled"
                    />
                  </div>
                </Grid>
                {cardValues.length > 1 && (
                  <Grid item xs={12}>
                    <Button
                      onClick={() => removeCard(index)}
                      variant="contained"
                      color="error"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Remove Card
                    </Button>
                  </Grid>
                )}
              </Grid>
            ))}
            <Button
              onClick={() => addCard()}
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add more card
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            {isLoading && (
              <Grid container justifyContent="center">
                <Loading type="bars" color="#F4C5F4" />
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
