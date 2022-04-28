import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";

export default function ResourceOptions({ onClick, tooltipTitle = "Opções" }) {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        onClick={onClick}
      >
        <MoreVertIcon />
      </IconButton>
    </Tooltip>
  );
}
