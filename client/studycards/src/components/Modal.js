import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
export default function DeleteAlertDialog({
  openDel,
  handleClose,
  handleDelete,
}) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog open={openDel} onClose={handleClose}>
          <DialogTitle>{"Delete this collection?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              you are about to delete this collection. You will not be able to
              recover this collection.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Continue
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              autoFocus
            >
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
