import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PersonService } from "../../services/api";
import { useSelector } from "react-redux";
import LoadingSpinner from "../feedback/LoadingSpinner";
import DetailTitle from "../ui/DetailTitle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SectionDivider from "../ui/SectionDivider";
import Stack from "@mui/material/Stack";
import StyledLink from "@mui/material/Link";
import PersonOptions from "./PersonOptions";
import Detail from "../ui/Detail";
import Chip from "@mui/material/Chip";

export default function PersonInfo() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.value);
  const { data, isLoading, error } = useQuery(["person", id], () =>
    PersonService.fetchPerson(id)
  );

  if (isLoading) return <LoadingSpinner />;

  if (error?.response?.status === 404)
    return <Alert severity="error">Servidor não encontrado.</Alert>;

  if (error)
    return (
      <Alert severity="error">Erro carregando os dados do servidor.</Alert>
    );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" position="relative">
          {user.is_admin && <PersonOptions onVacation={data.on_vacation} />}

          <Box>
            <Stack
              direction="row"
              flexWrap="wrap"
              marginBottom={2}
              spacing={{ xs: 0, md: 1 }}
              alignItems="center"
            >
              <DetailTitle defaultMargin={false}>{data.full_name}</DetailTitle>
              {data.on_vacation && <Chip label="Férias" color="warning" />}
            </Stack>
            <Detail
              title="Telefone"
              content={data.phone_number ? data.phone_number : "Não possui"}
            />
            <Detail
              title="Ramal"
              content={data.work_phone ? data.work_phone : "Não possui"}
            />
            <Detail
              title="E-mail institucional"
              content={data.professional_email}
            />
          </Box>
        </Box>
      </Grid>
      <SectionDivider />
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography gutterBottom variant="h6">
            Equipe
          </Typography>
          {data.team ? (
            <StyledLink
              variant="body1"
              component={Link}
              to={`/equipes/${data.team.id}`}
            >
              {data.team.name}
            </StyledLink>
          ) : (
            <Typography fontStyle="italic">Não possui</Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
