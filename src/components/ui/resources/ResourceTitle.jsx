import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function ResourceTitle({ children, divider = true }) {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="500"
        letterSpacing={0.5}
        gutterBottom
      >
        {children}
      </Typography>
      {divider && <Divider />}
    </Box>
  );
}
