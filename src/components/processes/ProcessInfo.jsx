import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { green, red } from "@mui/material/colors";
import Detail from "../ui/Detail";
import DetailContainer from "../ui/DetailContainer";
import Stack from "@mui/material/Stack";
import DetailTitle from "../ui/DetailTitle";
import SectionDivider from "../ui/SectionDivider";
import Typography from "@mui/material/Typography";
import StyledLink from "@mui/material/Link";
import ProcessUpdateItem from "./ProcessUpdateItem";
import ProcessUpdateCreate from "./ProcessUpdateCreate";
import ProcessOptions from "./ProcessOptions";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export default function ProcessInfo({ data }) {
  const user = useSelector((state) => state.user.value);

  return (
    <DetailContainer variant="outlined" maxWidth="md">
      <Stack position="relative">
        {(user.is_admin || user.id === data.created_by) && (
          <ProcessOptions process={data} />
        )}

        <Stack
          direction="row"
          marginBottom={2}
          flexWrap="wrap"
          alignItems="center"
          spacing={{ xs: 0, md: 1 }}
        >
          <DetailTitle defaultMargin={false}>{data.number}</DetailTitle>
          <Box
            bgcolor={data.is_active ? green[100] : red[100]}
            paddingX={1.6}
            paddingY={0.8}
            borderRadius={5}
          >
            <Typography
              variant="body2"
              color={data.is_active ? green[900] : red[900]}
              fontWeight={500}
            >
              {data.is_active ? "Aberto" : "Fechado"}
            </Typography>
          </Box>
        </Stack>

        <Detail title="Assunto" content={data.subject} />
        <Detail title="Descrição" content={data.description || "Não possui"} />
        <Detail
          title="Recebido/Gerado"
          content={data.is_generated ? "Gerado" : "Recebido"}
        />
        <Detail
          title="Prazo"
          content={
            data.due_to
              ? new Date(data.due_to).toLocaleDateString()
              : "Não possui"
          }
        />
        <Detail
          title="Preenchido por"
          content={data.user?.email ? data.user?.email : "Não possui"}
        />
        <Detail
          title="Criado em"
          content={
            data.created_at
              ? new Date(data.created_at).toLocaleString()
              : "Não possui"
          }
        />

        <SectionDivider />

        <Typography variant="h6" gutterBottom>
          Origem
        </Typography>
        <Box>
          <Chip
            variant={data.origin?.name ? "outlined" : "filled"}
            label={data.origin?.name || "Não possui"}
          />
        </Box>

        <SectionDivider />

        <Typography variant="h6" gutterBottom>
          Destinos
        </Typography>
        {data.destinations.length !== 0 ? (
          <Stack spacing={1}>
            {data.destinations.map((destination) => (
              <Box key={destination.id}>
                <Chip variant="outlined" label={destination.name} />
              </Box>
            ))}
          </Stack>
        ) : (
          <Box>
            <Chip label={"Não possui"} />
          </Box>
        )}

        <SectionDivider />

        <Typography variant="h6" gutterBottom>
          Responsável
        </Typography>

        <Typography gutterBottom>
          {data.responsible ? (
            <StyledLink
              component={Link}
              to={`/servidores/${data.responsible.id}`}
            >
              {data.responsible?.full_name}
            </StyledLink>
          ) : (
            "Não possui"
          )}
        </Typography>

        <SectionDivider />

        <Typography gutterBottom variant="h6">
          Atualizações
        </Typography>

        {data.updates && (
          <Stack spacing={1}>
            {data.updates.map((update) => (
              <ProcessUpdateItem key={update.id} update={update} />
            ))}
          </Stack>
        )}

        <ProcessUpdateCreate />
      </Stack>
    </DetailContainer>
  );
}
