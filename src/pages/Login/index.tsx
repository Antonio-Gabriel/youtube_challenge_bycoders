import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HeroView } from "../../views/LoginViews/Hero";
import { LoginView } from "../../views/LoginViews/Login";

export function Login() {
  const navigateTo = useNavigate();
  const accessToken = localStorage.getItem("bycoders-accessToken") ?? "";

  useEffect(() => {
    if (accessToken) {
      navigateTo("/");
    }
  }, []);

  return (
    <>
      <LoginView />
      <HeroView />
    </>
  );
}
