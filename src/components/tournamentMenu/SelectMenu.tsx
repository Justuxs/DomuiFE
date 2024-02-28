import React from "react";
import { FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from "@mui/material";

export interface ISelectMenuProps {
  handleChange(event: SelectChangeEvent<string | number>): void;
  inputText: string;
  selection: string | number;
  name: string;
  selectionArray: string[] | number[];
}

const SelectMenu: React.FC<ISelectMenuProps> = ({ handleChange, inputText, selection, name, selectionArray }) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel>{inputText}</InputLabel>
      <Select value={selection} name={name} onChange={handleChange}>
        {selectionArray.map((game) => (
          <MenuItem value={game} key={game}>
            {game}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
