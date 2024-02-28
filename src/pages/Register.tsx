import React, { useState } from "react";
import "../components/loginForm/RegisterForm.css";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/loginForm/RegisterForm";
import sendRequest, { sendRequest_ } from "../api/fetch";
import {loginUrl, registerUrl} from "../api/endpoints";
import {clearToken, isLoggedIn, logIn} from "../services/AuthService";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const submit = async (name: string, surname: string, email: string, password: string,password_repeat:string) => {
    if (!email || !name || !password || !password_repeat) {
      setError("Please fill in all the information");
    }
    else if(password_repeat !== password)setError("Passwords does not match");
    else {
      setError("");
      clearToken();

     // const res = await sendRequest(registerUrl, "POST", JSON.stringify({ name, surname, email, password }));
      const res = await sendRequest(registerUrl, "POST", JSON.stringify({ name, surname, email, password }));
      if (res.status) {
        document.location.href = "/login";
      }
      if (!res.status) {
        setError("Something wrong");
      }
    }
  };

  return (
    <div className="register">
      {isLoggedIn ? <Navigate to="/" /> : <RegisterForm register={submit} error={error} />}
    </div>
  );
};

export default RegisterPage;
