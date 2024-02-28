import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Login window loads", () => {
  render(<App />);
  const headerElement = screen.getByText("Login");
  expect(headerElement).toBeInTheDocument();
});
