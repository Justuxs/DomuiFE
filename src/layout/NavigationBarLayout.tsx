import { Outlet } from "react-router-dom";
import React from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";

const NavigationBarLayout: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default NavigationBarLayout;
