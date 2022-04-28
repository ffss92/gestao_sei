import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default function DetailContainer({
  children,
  maxWidth = "sm",
  variant = "elevation",
}) {
  return (
    <Container
      component={Paper}
      sx={{ paddingY: 4, overflowWrap: "break-word" }}
      variant={variant}
      maxWidth={maxWidth}
    >
      {children}
    </Container>
  );
}
