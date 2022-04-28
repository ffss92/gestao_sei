import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function ResourceInput({
  name,
  value,
  onChange,
  label,
  error,
  disabled = false,
  helperText,
  onClick,
  size = "small",
  fullWidth = true,
  buttonText = "Salvar",
  buttonDisabled = false,
  buttonType = "submit",
  buttonVariant = "outlined",
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        name={name}
        fullWidth={fullWidth}
        size={size}
        value={value}
        label={label}
        onChange={onChange}
        error={error}
        helperText={helperText}
        disabled={disabled}
      />
      <Button
        onClick={onClick}
        disabled={buttonDisabled}
        type={buttonType}
        variant={buttonVariant}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}
