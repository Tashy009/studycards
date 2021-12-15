import React from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import Header from "../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactSwipe from "react-swipe";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useGlobalContext } from "../contextAPI/appContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Cards() {
  const { id } = useParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { fetchStudyCards, flashcards } = useGlobalContext();

  React.useEffect(() => {
    fetchStudyCards(id);
  }, []);

  let reactSwipeEl;

  return (
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
      <Header />
      <Box>
        <Button color="secondary" href="/dashboard" sx={{ mt: 2 }}>
          <KeyboardArrowLeft /> GO TO DASHBOARD
        </Button>
      </Box>

      <Box
        sx={{
          minHeight: "70vh",
          minWidth: 275,
          width: { xs: "90%", md: "60%", lg: "35%" },

          mx: "auto",
        }}
      >
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false }}
          ref={(el) => (reactSwipeEl = el)}
        >
          {flashcards.map((card, idx) => {
            const { question, answer } = card;
            return (
              <Card
                key={idx}
                raised
                sx={{
                  minHeight: "70vh",
                  minWidth: 275,
                  width: { xs: "80%", md: "60%", lg: "30%" },
                  mt: 6,
                  mr: 3,
                  mx: "auto",
                  backgroundColor: "#f3e5f5",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "2rem",
                    textAlign: "center",
                    fontWeight: "bold",
                    alignItems: "center",
                    mt: 1,
                    mr: 1,
                    mb: 3,
                  }}
                >
                  {idx + 1}/{flashcards.length}
                </Typography>
                <Box
                  sx={{
                    m: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{
                      m: "auto",
                      mb: 5,
                    }}
                  >
                    {question}
                  </Typography>
                  <Button
                    onClick={handleExpandClick}
                    variant="outlined"
                    color="secondary"
                    endIcon={
                      <ExpandMore expand={expanded}>
                        <ExpandMoreIcon />
                      </ExpandMore>
                    }
                    sx={{
                      width: "50%",
                      mb: 3,
                    }}
                  >
                    {expanded ? "HIDE ANSWER" : "SHOW ANSWER"}
                  </Button>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography
                      variant="h5"
                      align="center"
                      color="text.secondary"
                      paragraph
                      sx={{
                        m: "auto",
                        mb: 3,
                      }}
                    >
                      {answer}
                    </Typography>
                  </Collapse>
                </Box>
              </Card>
            );
          })}

          <Card
            raised
            sx={{
              minHeight: "70vh",
              minWidth: 275,
              width: { xs: "80%", md: "60%", lg: "30%" },
              mt: 6,
              mx: "auto",
              backgroundColor: "#f3e5f5",
            }}
          >
            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
                sx={{
                  m: "auto",
                  mb: 3,
                }}
              >
                This is the end of the flashcards.
              </Typography>
              <Button color="secondary" href="/dashboard" sx={{ mt: 2 }}>
                <KeyboardArrowLeft /> GO TO DASHBOARD
              </Button>
            </Box>
          </Card>
        </ReactSwipe>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            color="secondary"
            size="small"
            onClick={() => reactSwipeEl.prev()}
          >
            <KeyboardArrowLeft /> Previous
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={() => reactSwipeEl.next()}
          >
            Next <KeyboardArrowRight />
          </Button>
        </Box>
      </Box>
      {/*     </Slider> */}
    </Box>
  );
}

export default Cards;
