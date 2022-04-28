import Typography from "@mui/material/Typography";

export default function DetailField({ children }) {
  return (
    <Typography component="div" gutterBottom fontSize={18}>
      {children}
    </Typography>
  );
}
