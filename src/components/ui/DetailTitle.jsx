import Typography from "@mui/material/Typography";

export default function DetailTitle({ children, defaultMargin = true }) {
  return (
    <Typography variant="h4" gutterBottom={defaultMargin}>
      {children}
    </Typography>
  );
}
