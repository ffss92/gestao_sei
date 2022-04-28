import { useQuery } from "react-query";
import { TeamService } from "../../services/api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Alert from "@mui/material/Alert";
import LoadingSpinner from "../feedback/LoadingSpinner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import StyledLink from "@mui/material/Link";
import TeamTableActions from "./TeamTableActions";

export default function TeamTable() {
  const user = useSelector((state) => state.user.value);
  const { isLoading, data, error } = useQuery(
    "teams",
    () => TeamService.fetchTeams(),
    { retry: false }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return <Alert severity="warning">Nenhuma equipe encontrada.</Alert>;

  if (error)
    return (
      <Alert severity="error">
        Erro carregando os dados. Verifique sua conexão ou tente novamente mais
        tarde.
      </Alert>
    );

  return (
    <TableContainer component={Paper}>
      <Box display="flex" padding={2} flexDirection="column">
        <Typography gutterBottom variant="h4">
          Equipes
        </Typography>
      </Box>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Status</TableCell>
            {user.is_admin && <TableCell align="right">Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((team) => (
            <TableRow
              key={team.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <StyledLink component={Link} to={`/equipes/${team.id}`}>
                  {team.name}
                </StyledLink>
              </TableCell>
              <TableCell align="right">
                {team.is_active ? "Em atividade" : "Inativa"}
              </TableCell>
              {user.is_admin && <TeamTableActions team={team} />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
