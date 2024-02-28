import React from "react";
import { TableRow, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dayjs } from "dayjs";
import { PlayerProps, IGameResultNoId } from "./ResultsTableInterfaces";
import { TableRowSX } from "./ResultsTableStyles";
import ResultAutoComplete from "./ResultAutoComplete";
import CustomDatePicker from "../customDatePicker/CustomDatePicker";

interface EditableRowProps {
  handleDateChange: (date: Dayjs | null) => void;
  handleResultsChange: (e: React.SyntheticEvent, value: PlayerProps | null, placeKey: number) => void;
  handleEditSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelClick: () => void;
  handleDeleteClick: (rowId: number) => void;
  editStoredData: IGameResultNoId;
  playerList: Array<PlayerProps>;
  resultId: number;
  editState: boolean;
}

const EditableRow: React.FunctionComponent<EditableRowProps> = ({
  editStoredData,
  handleDateChange,
  handleResultsChange,
  handleEditSubmit,
  handleCancelClick,
  handleDeleteClick,
  playerList,
  resultId,
  editState,
}) => {
  return (
    <TableRow sx={TableRowSX}>
      <TableCell component="th" scope="row">
        <CustomDatePicker handleDateChange={handleDateChange} date={editStoredData.gameDate} />
      </TableCell>
      <TableCell align="left">
        <ResultAutoComplete
          id="firstPlace"
          handleResultsChange={handleResultsChange}
          playerList={playerList}
          storedPlayerId={editStoredData.firstPlaceId}
          storedPlayerName={editStoredData.firstPlace}
          placeKey={1}
        />
      </TableCell>
      <TableCell align="left">
        <ResultAutoComplete
          id="secondPlace"
          handleResultsChange={handleResultsChange}
          playerList={playerList}
          storedPlayerId={editStoredData.secondPlaceId}
          storedPlayerName={editStoredData.secondPlace}
          placeKey={2}
        />
      </TableCell>
      <TableCell align="left">
        <ResultAutoComplete
          id="thirdPlace"
          handleResultsChange={handleResultsChange}
          playerList={playerList}
          storedPlayerId={editStoredData.thirdPlaceId}
          storedPlayerName={editStoredData.thirdPlace}
          placeKey={3}
        />
      </TableCell>
      <TableCell align="left">
        <IconButton aria-label="submit" onClick={handleEditSubmit} sx={{ marginLeft: -1.5 }}>
          <DoneIcon />
        </IconButton>
        {editState === true && (
          <IconButton aria-label="cancel" onClick={handleCancelClick}>
            <CancelIcon />
          </IconButton>
        )}
        <IconButton aria-label="delete" onClick={() => handleDeleteClick(resultId)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
