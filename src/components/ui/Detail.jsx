import { Chip, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Detail({
  title,
  content,
  chip = false,
  chipColor = "primary",
}) {
  return (
    <>
      <Typography variant="body1" fontWeight={500}>
        {title}
      </Typography>
      {chip ? (
        <Box>
          <Chip color={chipColor} label={content} />
        </Box>
      ) : (
        <Typography gutterBottom variant="body2">
          {content}
        </Typography>
      )}
    </>
  );
}
