import React from "react";
import { IconButton, TableCell } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { sortArg } from "./ResultsTable.utils";
import { IGameResultProps } from "./ResultsTableInterfaces";

interface ResultTableCellProps {
  handleDateSort: (condition: sortArg<IGameResultProps>) => void;
  placeKey: sortArg<IGameResultProps>;
  placeKeyMinus: sortArg<IGameResultProps>;
  title: string;
}

const ResultTableCell: React.FunctionComponent<ResultTableCellProps> = ({
  handleDateSort,
  placeKey,
  placeKeyMinus,
  title,
}) => {
  return (
    <TableCell align="left">
      {title}
      <IconButton aria-label="sort" onClick={() => handleDateSort(placeKey)}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton aria-label="sort" onClick={() => handleDateSort(placeKeyMinus)} sx={{ marginLeft: -2 }}>
        <ArrowDownwardIcon />
      </IconButton>
    </TableCell>
  );
};

export default ResultTableCell;
