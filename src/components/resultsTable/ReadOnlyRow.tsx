import React from "react";
import { TableRow, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IGameResultProps } from "./ResultsTableInterfaces";
import { TableRowSX } from "./ResultsTableStyles";

interface ReadOnlyRowProps {
  result: IGameResultProps;
  handleEditClick: (e: React.MouseEvent<HTMLButtonElement>, row: IGameResultProps) => void;
  handleDeleteClick: (rowId: number) => void;
  editResultId: number;
}

const ReadOnlyRow: React.FunctionComponent<ReadOnlyRowProps> = ({
  result,
  handleEditClick,
  handleDeleteClick,
  editResultId,
}) => {
  return (
    <TableRow key={result.id} sx={TableRowSX}>
      <TableCell component="th" scope="row">
        <input type="text" defaultValue={result.gameDate} readOnly />
      </TableCell>
      <TableCell align="left">
        <input type="text" defaultValue={result.firstPlace} readOnly />
      </TableCell>
      <TableCell align="left">
        <input type="text" defaultValue={result.secondPlace} readOnly />
      </TableCell>
      <TableCell align="left">
        <input type="text" defaultValue={result.thirdPlace} readOnly />
      </TableCell>
      <TableCell align="left">
        <IconButton
          aria-label="edit"
          onClick={(event) => handleEditClick(event, result)}
          sx={{ marginLeft: -1.5 }}
          disabled={editResultId > 0}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handleDeleteClick(result.id)} disabled={editResultId > 0}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;
