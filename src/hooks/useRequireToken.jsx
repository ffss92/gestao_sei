import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../features/userSlice";
import { useLocation } from "react-router-dom";

export default function useRequireToken() {
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    const checkAccessToken = () => {
      const accessTokenData = localStorage.getItem("accessToken");
      if (!accessTokenData) {
        dispatch(signOut());
      }
    };
    checkAccessToken();
  }, [location.pathname, dispatch]);
}
