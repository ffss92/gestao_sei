import { useQuery } from "react-query";
import { ProcessService } from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LoadingSpinner from "../feedback/LoadingSpinner";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

export default function LastestProcesses() {
  const from = useLocation();
  const navigate = useNavigate();
  const { isLoading, data, error, refetch } = useQuery(
    "latestProcesses",
    () => ProcessService.fetchLatest(),
    {
      retry: 1,
    }
  );
  const handleClick = (process) => {
    navigate(`/processos/${process.id}`, {
      state: { from },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return (
      <Alert
        severity="warning"
        action={
          <Button size="small" onClick={() => refetch()} color="warning">
            Recarregar
          </Button>
        }
      >
        Nenhum processo encontrado
      </Alert>
    );

  if (error)
    return (
      <Alert
        severity="error"
        action={
          <Button size="small" onClick={() => refetch()} color="error">
            Recarregar
          </Button>
        }
      >
        Erro buscando processos
      </Alert>
    );

  return (
    <Box component={Paper} variant="outlined" overflow="hidden">
      <List dense>
        {data.map((process) => (
          <ListItem
            disablePadding
            key={process.id}
            secondaryAction={
              <Tooltip
                title={`${process.user.email} - ${new Date(
                  process.created_at
                ).toLocaleString()}`}
              >
                <IconButton size="small" onClick={() => handleClick(process)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton onClick={() => handleClick(process)}>
              <ListItemText
                primary={process.number}
                secondary={process.subject}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
