import { useMutation, useQueryClient } from "react-query";
import { UserService } from "../../services/api";
import useSnackbar from "../../hooks/useSnackbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function UserList({ users }) {
  return (
    <Stack component={Paper} spacing={2} variant="outlined">
      <Stack spacing={1} padding={2}>
        <Typography variant="h4">Gestão de Usuários</Typography>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </Stack>
    </Stack>
  );
}

function UserListItem({ user }) {
  const { displaySnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (data) => UserService.updateUser(user.id, data),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries("users");
        displaySnackbar({
          message: "Usuário alterado com sucesso!",
          severity: "info",
        });
      },
      onError: (_error, _variables) => {
        displaySnackbar({
          message: "Não foi possível alterar o usuário!",
          severity: "error",
        });
      },
    }
  );

  return (
    <Stack
      paddingX={{ xs: 1, md: 2 }}
      paddingY={1}
      border={1}
      borderRadius={2}
      borderColor="divider"
      key={user.id}
      spacing={1}
    >
      <Typography variant="h6" flex={1}>
        {user.email}
      </Typography>

      <Typography component="span" flex={1}>
        <Typography component="span" fontWeight={500}>
          Situação
        </Typography>
        : {user.is_active ? "Ativa" : "Inativa"}
      </Typography>

      <Typography component="span" flex={1}>
        <Typography component="span" fontWeight={500}>
          Tipo
        </Typography>
        : {user.is_admin ? "Administrador" : "Usuário"}
      </Typography>

      <Box display="flex" justifyContent="end">
        <Button
          disabled={updateMutation.isLoading}
          sx={{ marginRight: 1 }}
          onClick={() => updateMutation.mutate({ is_admin: !user.is_admin })}
        >
          {user.is_admin ? "Tornar Usuário" : "Tornar Admin"}
        </Button>
        <Button
          variant="contained"
          disabled={updateMutation.isLoading}
          color={user.is_active ? "error" : "success"}
          onClick={() => updateMutation.mutate({ is_active: !user.is_active })}
        >
          {user.is_active ? "Desativar" : "Ativar"}
        </Button>
      </Box>
    </Stack>
  );
}
