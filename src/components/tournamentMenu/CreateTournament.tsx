import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { SelectChangeEvent, Grid } from "@mui/material";
import { bestOfOptions, prepareMatchState } from "../../utils/tournamentUtils";
import { Game, Tournament } from "../tournamentTable/TournamentModels";
import SelectMenu from "./SelectMenu";
import PlayersSelectionModal, { PlayerProps } from "../playerSelectionModal/PlayerSelectionModal";

interface ICreateTournamentProps {
  handleCreate(tournamentObj: Tournament): Promise<void>;
}

const CreateTournament: React.FC<ICreateTournamentProps> = ({ handleCreate }) => {
  const scoreOptions: number[] = [...bestOfOptions];
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerProps[]>([]);
  const [open, setOpen] = React.useState(false);

  const [tournament, setTournament] = useState<Tournament>({
    name: "",
    score: 1,
    matchList: [],
  });

  useEffect(() => {
    const values = prepareMatchState(selectedPlayers);
    const matches = values.map((game: Game) => {
      return { ...game };
    });
    setTournament((prevState) => ({
      ...prevState,
      matchList: matches,
    }));
  }, [selectedPlayers]);

  const resetState = (): void => {
    setTournament({
      name: "",
      score: 1,
      matchList: [],
    });
    setSelectedPlayers([]);
  };

  const handleSelectedPlayers = (playerList: PlayerProps[]): void => {
    setSelectedPlayers(() =>
      playerList.map((player) => {
        return { ...player };
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const handleCreateClick = () => {
    setOpen(false);
    handleCreate(tournament);
    resetState();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ): void => {
    const { value } = event.target;
    setTournament((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };
  const isButtonDisabled = !!(tournament.name && selectedPlayers.length >= 2);

  return (
    <Grid item xs={2}>
      <Card
        sx={{ minHeight: 175 }}
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "87%",
          marginLeft: "6.5%",
          marginRight: "6.5%",
          border: "2px solid",
        }}
      >
        <CardContent sx={{ minHeight: 175 }} component={Stack} direction="column" justifyContent="center">
          <Button variant="outlined" onClick={handleClickOpen}>
            Create Tournament
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Tournament</DialogTitle>
            <DialogContent>
              <DialogContentText>Name your tournament, select rules, add players and PLAY!</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Tournament name"
                type="text"
                fullWidth
                variant="standard"
                value={tournament.name}
                name="name"
                onChange={handleChange}
              />
              <Grid container>
                <Grid item xs={6}>
                  <SelectMenu
                    handleChange={handleChange}
                    inputText="No. wins to advance"
                    name="score"
                    selection={tournament.score}
                    selectionArray={scoreOptions}
                  />
                </Grid>
                <Grid item xs={6}>
                  <PlayersSelectionModal handlePlayer={handleSelectedPlayers} />
                  <DialogContentText>Selected Player Count {selectedPlayers.length}</DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreateClick} disabled={!isButtonDisabled}>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreateTournament;
