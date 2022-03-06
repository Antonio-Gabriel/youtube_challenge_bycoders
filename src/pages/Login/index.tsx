import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { HeroView } from "../../views/LoginViews/Hero";
import { LoginView } from "../../views/LoginViews/Login";

export function Login() {
  const navigateTo = useNavigate();
  const { accessToken } = useSelector<any>((state) => state.auth) as any;

  useEffect(() => {
    if (accessToken) {
      navigateTo("/");
    }
  }, [accessToken]);

  return (
    <>
      <LoginView />
      <HeroView />
    </>
  );
}
