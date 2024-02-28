import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PlayerSelectionModal from "./PlayerSelectionModal";

afterEach(cleanup);

it("renders player selection modal", () => {
  const emptyFunction = (): null => {
    return null;
  };
  render(<PlayerSelectionModal handlePlayer={emptyFunction} />);
  const playerSelectionModalElement = screen.getByTestId("player-selection-modal");
  expect(playerSelectionModalElement).toBeInTheDocument();
});

it("contains select players text in button", () => {
  const emptyFunction = (): null => {
    return null;
  };
  render(<PlayerSelectionModal handlePlayer={emptyFunction} />);
  const button = screen.getByTestId("modal-open-button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Select players");
});

it("opens player selection modal when button is clicked", () => {
  const emptyFunction = (): null => {
    return null;
  };
  render(<PlayerSelectionModal handlePlayer={emptyFunction} />);
  const button = screen.getByTestId("modal-open-button");
  fireEvent.click(button);
  const playerSelectionModalDialog = screen.getByTestId("player-selection-modal-dialog");
  expect(playerSelectionModalDialog).toBeInTheDocument();
});
