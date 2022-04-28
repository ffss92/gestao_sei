import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { PersonService } from "../../services/api";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import StyledLink from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

export default function MemberItem({ member }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => PersonService.updatePerson(member.id, { team_id: null }),
    {
      onSuccess: (_data, _variables) => {
        queryClient.invalidateQueries(["teamMembers", id]);
        queryClient.invalidateQueries("people");
      },
      onSettled: (_data, _error, _variables) => {
        setLoading(false);
      },
    }
  );
  const handleClick = () => {
    setLoading(true);
    mutation.mutate();
  };

  return (
    <ListItem
      sx={{
        "&:hover": { background: grey[200] },
        marginY: 0.5,
        borderRadius: 2,
        transition: "background 250ms",
        background: grey[50],
      }}
      secondaryAction={
        user.is_admin && (
          <Tooltip title={`Remover membro da equipe`}>
            <IconButton disabled={loading} onClick={handleClick}>
              {loading ? <CircularProgress size={18} /> : <ClearIcon />}
            </IconButton>
          </Tooltip>
        )
      }
    >
      <ListItemText
        primary={
          <StyledLink component={Link} to={`/servidores/${member.id}`}>
            {member.full_name}
          </StyledLink>
        }
      />
    </ListItem>
  );
}
