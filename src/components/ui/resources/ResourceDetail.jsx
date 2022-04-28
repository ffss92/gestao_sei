import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ResourceDetail({ name, value }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight="500">
        {name}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}
