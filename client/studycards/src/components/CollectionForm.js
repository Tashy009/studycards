import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CollectionFormDialog({
  openMode,
  handleClose,
  handleChange,
}) {
  return (
    <div>
      <Dialog open={openMode} onClose={handleClose}>
        <DialogTitle>Create Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give a unique name to your collection.
          </DialogContentText>
          <TextField
            autoFocus
            color="secondary"
            margin="dense"
            name="name"
            id="name"
            label="Name of Collection"
            type="name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
