import { useDispatch } from "react-redux";
import { showSnackbar } from "../features/snackbarSlice";

export default function useSnackbar() {
  const dispatch = useDispatch();
  const displaySnackbar = (snackbarData) => {
    dispatch(
      showSnackbar({
        ...snackbarData,
        open: true,
      })
    );
  };

  return { displaySnackbar };
}
