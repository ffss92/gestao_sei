import { useQuery } from "react-query";
import { TeamService } from "../../services/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DetailTitle from "../ui/DetailTitle";
import Detail from "../ui/Detail";
import TeamOptions from "./TeamOptions";

export default function TeamInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.user.value);
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ["team", id],
    () => TeamService.fetchTeamDetail(id),
    { retry: false }
  );
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" height="100%" marginTop={4}>
        <CircularProgress />
      </Box>
    );

  if (error && error.response?.status === 404)
    return (
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Alert severity="warning">Nenhuma equipe encontrada.</Alert>
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Alert severity="error">
          Erro de rede. Verifique sua conexão ou tente novamente mais tarde.
        </Alert>
      </Container>
    );

  return (
    <Box display="flex" flexDirection="column" position="relative">
      {user.is_admin && (
        <TeamOptions isEditing={isEditing} setIsEditing={toggleEditing} />
      )}
      <DetailTitle>{data.name}</DetailTitle>
      <Detail title="Situação" content={data.is_active ? "Ativa" : "Inativa"} />
      <Detail
        title="Criado em"
        content={new Date(data.created_at).toLocaleDateString()}
      />
    </Box>
  );
}
