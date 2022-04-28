import Typography from "@mui/material/Typography";

export default function BoldText({ children }) {
  return (
    <Typography component="span" fontSize="inherit" fontWeight="600">
      {children}
    </Typography>
  );
}
