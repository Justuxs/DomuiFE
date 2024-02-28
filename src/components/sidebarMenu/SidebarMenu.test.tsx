import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

afterEach(cleanup);

it("renders sidebar menu button", () => {
  render(
    <Router>
      <SidebarMenu />
    </Router>
  );
  const sidebarOpenButton = screen.getByTestId("sidebar-open-button");
  expect(sidebarOpenButton).toBeInTheDocument();
});

it("opens sidebar menu when button is clicked", () => {
  render(
    <Router>
      <SidebarMenu />
    </Router>
  );
  const sidebarOpenButton = screen.getByTestId("sidebar-open-button");
  fireEvent.click(sidebarOpenButton);
  const sidebarDrawer = screen.getByTestId("sidebar-drawer");
  expect(sidebarDrawer).toBeInTheDocument();
  expect(sidebarDrawer).toHaveTextContent("Menu");
});
