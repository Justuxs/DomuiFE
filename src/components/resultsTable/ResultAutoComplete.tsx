import React from "react";
import TextField from "@mui/material/TextField";
import AutoComplete from "@mui/material/Autocomplete";
import { PlayerProps } from "./ResultsTableInterfaces";

interface ResultAutoCompleteProps {
  handleResultsChange: (e: React.SyntheticEvent, value: PlayerProps | null, placeKey: number) => void;
  playerList: Array<PlayerProps>;
  id: string;
  placeKey: number;
  storedPlayerName: string;
  storedPlayerId: number;
}

const ResultAutoComplete: React.FunctionComponent<ResultAutoCompleteProps> = ({
  handleResultsChange,
  playerList,
  id,
  placeKey,
  storedPlayerName,
  storedPlayerId,
}) => {
  return (
    <AutoComplete
      id={id}
      placeholder="Enter a name"
      onChange={(event, value) => handleResultsChange(event, value, placeKey)}
      disablePortal
      options={playerList}
      defaultValue={{ id: storedPlayerId, name: storedPlayerName }}
      value={{ id: storedPlayerId, name: storedPlayerName }}
      sx={{ width: 210 }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Players" placeholder="Search player name" />
      )}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
    />
  );
};

export default ResultAutoComplete;
