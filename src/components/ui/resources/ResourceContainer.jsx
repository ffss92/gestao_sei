import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function ResourceContainer({ children, variant = "outlined" }) {
  return (
    <Stack
      component={Paper}
      variant={variant}
      padding={2}
      spacing={1.5}
      overflow="hidden"
      position="relative"
    >
      {children}
    </Stack>
  );
}
