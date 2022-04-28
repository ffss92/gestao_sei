import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner({ size = 20 }) {
  return (
    <Box display="flex" minHeight="48px" justifyContent="center">
      <CircularProgress size={size} color="secondary" />
    </Box>
  );
}
