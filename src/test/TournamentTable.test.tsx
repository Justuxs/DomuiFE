import { render, screen } from "@testing-library/react";
import TournamentTable from "../components/tournamentTable/TournamentTable";

// eslint-disable-next-line no-undef
describe(TournamentTable, () => {
  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    // eslint-disable-next-line react/jsx-filename-extension,react/react-in-jsx-scope
    render(<TournamentTable />);
    await screen.findByText("Loading...");
  });

  // eslint-disable-next-line no-undef
  it("Loading", async () => {
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });
});
