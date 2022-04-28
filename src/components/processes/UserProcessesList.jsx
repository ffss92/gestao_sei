import { useQuery } from "react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProcessService } from "../../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LoadingSpinner from "../feedback/LoadingSpinner";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export default function UserProcessesList({ currentTab }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [currentTab]);
  const user = useSelector((state) => state.user.value);
  const { data, isLoading, error, refetch } = useQuery(
    [
      "processes",
      { limit: 8, page, created_by: user.id, is_active: currentTab },
    ],
    () =>
      ProcessService.fetchProcesses({
        limit: 8,
        page,
        created_by: user.id,
        is_active: currentTab,
      }),
    { retry: false }
  );
  const handleClick = (_event, value) => {
    setPage(value);
  };

  if (isLoading)
    return (
      <Box
        minHeight={670}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={1}
      >
        <LoadingSpinner size={32} />
      </Box>
    );

  if (error?.response?.status === 404)
    return (
      <Box
        minHeight={650}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={1}
      >
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
      </Box>
    );

  if (error)
    return (
      <Box
        minHeight={650}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={1}
      >
        <Alert
          severity="error"
          action={
            <Button size="small" onClick={() => refetch()} color="error">
              Recarregar
            </Button>
          }
        >
          Erro carregando os processos
        </Alert>
      </Box>
    );

  return (
    <Box minHeight={650} display="flex" flexDirection="column">
      <Box flex={1}>
        <List>
          {data.data.map((process) => (
            <ListItem key={process.id} disablePadding>
              <ListItemButton
                onClick={() => navigate(`/processos/${process.id}`)}
              >
                <ListItemText
                  primary={process.number}
                  secondary={process.subject}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="center" marginY={2}>
        <Pagination
          page={page}
          onChange={handleClick}
          count={data.meta.total_pages}
          color="primary"
        />
      </Box>
    </Box>
  );
}
