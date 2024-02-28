import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/loginForm/LoginForm";
import "../components/loginForm/LoginForm.css";
import sendRequest from "../api/fetch";
import { loginUrl } from "../api/endpoints";
import { clearToken, isLoggedIn, logIn } from "../services/AuthService";

const LoginPage: React.FunctionComponent = () => {
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setError("Please fill in all the information");
    } else {
      setError("");
      clearToken();
      const res = await sendRequest(loginUrl, "POST", JSON.stringify({ email, password }));
      if (res.status) {
        logIn(email);
        document.location.href = "/";
      }
      if (!res.status) {
        setError("SOMETHING WRONG");
      }
    }
  };

  return <div className="Login">{isLoggedIn ? <Navigate to="/" /> : <LoginForm login={login} error={error} />}</div>;
};

export default LoginPage;
