import { Snackbar as MaterialSnackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { hideSnackbar } from "../features/snackbarSlice";

export default function Snackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar.value);

  return (
    <MaterialSnackbar
      open={snackbar.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={(_event, reason) => dispatch(hideSnackbar(reason))}
      autoHideDuration={3000}
    >
      <Alert
        variant={snackbar.variant || "filled"}
        sx={{ width: "100%" }}
        severity={snackbar.severity}
        onClose={(event, reason) => dispatch(hideSnackbar(reason))}
      >
        {snackbar.message}
      </Alert>
    </MaterialSnackbar>
  );
}
