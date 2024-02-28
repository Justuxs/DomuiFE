import React from "react";
import { isLoggedIn } from "../services/AuthService";
import LoginPage from "./Login";

// eslint-disable-next-line
const PrivateRoute = (props: { children: any }) => {
  const { children } = props;

  return isLoggedIn ? children : <LoginPage />;
};
export default PrivateRoute;
