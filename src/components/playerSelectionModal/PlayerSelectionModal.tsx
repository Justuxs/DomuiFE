import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import sendRequest from "../../api/fetch";
import { playersUrl } from "../../api/endpoints";

export interface PlayerProps {
  id: number;
  name: string;
}

interface SelectProps {
  handlePlayer(playerList: PlayerProps[]): void;
}

export default function PlayersSelectionModal({ handlePlayer }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [playerList, setPlayerList] = useState<Array<PlayerProps>>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPlayers, setSelectedPlayers] = useState<Array<PlayerProps>>([]);

  useEffect(() => {
    const getResponse = async () => {
      const res = await sendRequest(playersUrl, "GET", "");
      setPlayerList(JSON.parse(res.message));
    };
    getResponse();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    handlePlayer(selectedPlayers);
  };

  return (
    <div data-testid="player-selection-modal">
      <Button variant="outlined" onClick={handleOpen} data-testid="modal-open-button">
        Select players
      </Button>
      <Dialog open={isOpen} onClose={handleClose} fullWidth data-testid="player-selection-modal-dialog">
        <DialogTitle>Select players</DialogTitle>
        <DialogContent>
          <DialogContentText>Select the players that will participate</DialogContentText>
          <Autocomplete
            multiple
            options={playerList}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Players" placeholder="Search player name" />
            )}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setSelectedPlayers(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Select</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
