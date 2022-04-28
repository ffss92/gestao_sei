import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../features/userSlice";
import { fetchCurrentUser } from "../services/api";

export default function useInitialLoad() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const accessTokenData = localStorage.getItem("accessToken");
      if (!accessTokenData) {
        setLoading(false);
        return;
      }
      try {
        const now = Date.now();
        const { value: accessToken, expires } = JSON.parse(accessTokenData);
        // Confere se o token está expirado
        if (now > expires) throw Error("Token expired");
        // Busca os dados do usuário
        const userData = await fetchCurrentUser(accessToken);
        // Atualiza o estado do usuário com os dados retornados
        dispatch(signIn(userData));
        // Define um login automático 5 minutos antes do Token expirar
        setTimeout(() => {
          dispatch(signOut());
          localStorage.removeItem("accessToken");
        }, expires - now + 1000 * 60 * 5);
        setTimeout(() => setLoading(false), 350);
      } catch (err) {
        // Caso o token esteja expirado ou inválido, remove-o
        localStorage.removeItem("accessToken");
        setTimeout(() => setLoading(false), 350);
      }
    };
    loadUser();
  }, [dispatch]);

  return { loading };
}
