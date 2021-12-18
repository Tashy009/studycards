import * as React from "react";
import { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useGlobalContext } from "../contextAPI/appContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alertbar({ open, message, severity }) {
  /* const [openAlert, setOpenAlert] = React.useState(true); */
  //setOpenAlert(open);
  const { openAlert, closeAlert } = useGlobalContext();
  /* console.log(openAlert); */

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeAlert();
  };

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
