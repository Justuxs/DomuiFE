import React, { useState, useEffect } from "react";
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper } from "@mui/material";
import AutoComplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import { TableSX } from "./ResultsTableStyles";
import {
  IGameResultNoId,
  IResultsTableProps,
  PlayerProps,
  IGameResultProps,
  CreateResultData,
  UpdateResultData,
} from "./ResultsTableInterfaces";
import sendRequest from "../../api/fetch";
import { resultsUrl } from "../../api/endpoints";
import { filter, sortArg, sort } from "./ResultsTable.utils";
import ResultTableCell from "./ResultTableCell";

const ResultsTable: React.FunctionComponent<IResultsTableProps> = ({
  playerList,
  results,
  setResults,
  addedResultId,
  setAddedResultId,
  addButtonClicked,
  fetchStatus,
  resultGroupId,
}) => {
  const [editResultId, setEditResultId] = useState(0);
  const [editState, setEditState] = useState(false);
  const [showResults, setShowResults] = useState<Array<IGameResultProps>>([]);
  const [showValue, setShowValue] = useState<PlayerProps | null>(null);
  const [isDateValid, setIsDateValid] = useState(true);

  const [editStoredData, setEditStoredData] = useState<IGameResultNoId>({
    gameDate: "",
    firstPlace: "",
    firstPlaceId: 0,
    secondPlace: "",
    secondPlaceId: 0,
    thirdPlace: "",
    thirdPlaceId: 0,
  });

  useEffect(() => {
    setEditResultId(addedResultId);
    const emptyRow: IGameResultNoId = {
      gameDate: "",
      firstPlace: "",
      firstPlaceId: 0,
      secondPlace: "",
      secondPlaceId: 0,
      thirdPlace: "",
      thirdPlaceId: 0,
    };
    setEditStoredData(emptyRow);
    if (fetchStatus) {
      setShowResults(results);
    }
    if (showValue !== null) {
      const emptyRowId: IGameResultProps = {
        id: addedResultId,
        gameDate: "",
        firstPlace: "",
        firstPlaceId: 0,
        secondPlace: "",
        secondPlaceId: 0,
        thirdPlace: "",
        thirdPlaceId: 0,
      };
      setShowResults([...filter(showValue, results), emptyRowId]);
    }
  }, [addButtonClicked]);

  useEffect(() => {
    setShowResults(results);
  }, [fetchStatus]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date !== null && date.isValid()) {
      const dateValue = date.format("YYYY-MM-DD");

      const newEditStoredData = { ...editStoredData };
      newEditStoredData.gameDate = dateValue;

      setEditStoredData(newEditStoredData);
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  };

  const handleResultsChange = (e: React.SyntheticEvent, value: PlayerProps | null, placeKey: number) => {
    e.preventDefault();
    const newEditStoredData: IGameResultNoId = { ...editStoredData };
    if (value !== null) {
      switch (placeKey) {
        case 1: {
          newEditStoredData.firstPlace = value.name;
          newEditStoredData.firstPlaceId = value.id;
          break;
        }
        case 2: {
          newEditStoredData.secondPlace = value.name;
          newEditStoredData.secondPlaceId = value.id;
          break;
        }
        case 3: {
          newEditStoredData.thirdPlace = value.name;
          newEditStoredData.thirdPlaceId = value.id;
          break;
        }
        default: {
          break;
        }
      }
      setEditStoredData(newEditStoredData);
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>, result: IGameResultProps) => {
    e.preventDefault();
    setEditResultId(result.id);
    const storedResult: IGameResultNoId = {
      gameDate: result.gameDate,
      firstPlace: result.firstPlace,
      firstPlaceId: result.firstPlaceId,
      secondPlace: result.secondPlace,
      secondPlaceId: result.secondPlaceId,
      thirdPlace: result.thirdPlace,
      thirdPlaceId: result.thirdPlaceId,
    };
    setEditStoredData(storedResult);
    setEditState(true);
    setIsDateValid(true);
    setAddedResultId(1);
  };

  const handleEditSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      editStoredData.firstPlace !== editStoredData.secondPlace &&
      editStoredData.firstPlace !== editStoredData.thirdPlace &&
      editStoredData.secondPlace !== editStoredData.thirdPlace &&
      editStoredData.gameDate !== "" &&
      editStoredData.firstPlace !== "" &&
      editStoredData.secondPlace !== "" &&
      editStoredData.thirdPlace !== "" &&
      isDateValid
    ) {
      const editedResult: IGameResultProps = {
        id: editResultId,
        gameDate: editStoredData.gameDate,
        firstPlace: editStoredData.firstPlace,
        firstPlaceId: editStoredData.firstPlaceId,
        secondPlace: editStoredData.secondPlace,
        secondPlaceId: editStoredData.secondPlaceId,
        thirdPlace: editStoredData.thirdPlace,
        thirdPlaceId: editStoredData.thirdPlaceId,
      };

      const newResults: IGameResultProps[] = [...results];
      const newShowResults: IGameResultProps[] = [...showResults];
      const index = results.findIndex((result) => result.id === editResultId);
      const indexShow = showResults.findIndex((result) => result.id === editResultId);

      newResults[index] = editedResult;
      newShowResults[indexShow] = editedResult;

      if (editState === false) {
        const resultData: CreateResultData = {
          gameDate: editedResult.gameDate,
          firstPlace: editedResult.firstPlaceId,
          secondPlace: editedResult.secondPlaceId,
          thirdPlace: editedResult.thirdPlaceId,
          resultsGroup: resultGroupId,
        };
        await sendRequest(resultsUrl, "POST", JSON.stringify(resultData));
      } else {
        const resultData: UpdateResultData = {
          id: editResultId,
          gameDate: editedResult.gameDate,
          firstPlace: editedResult.firstPlaceId,
          secondPlace: editedResult.secondPlaceId,
          thirdPlace: editedResult.thirdPlaceId,
          resultsGroup: resultGroupId,
        };
        await sendRequest(resultsUrl, "PUT", JSON.stringify(resultData));
      }
      setEditState(false);
      setAddedResultId(0);
      setShowResults(newShowResults);
      setShowResults(filter(showValue, newShowResults));
      setResults(newResults);
      setEditResultId(0);
    }
  };

  const handleCancelClick = () => {
    if (
      editStoredData.gameDate !== "" &&
      editStoredData.firstPlace !== "" &&
      editStoredData.secondPlace !== "" &&
      editStoredData.thirdPlace !== ""
    ) {
      setEditResultId(0);
    }
  };

  const handleDeleteClick = async (resultId: number) => {
    const newRows: IGameResultProps[] = [...results];
    const newShowRows: IGameResultProps[] = [...showResults];
    const index = results.findIndex((result) => result.id === resultId);
    const indexShow = showResults.findIndex((result) => result.id === resultId);

    if (resultId !== addedResultId || (results.length === 1 && addedResultId !== 1)) {
      await sendRequest(resultsUrl, "DELETE", JSON.stringify({ deleteId: resultId }));
    }

    newRows.splice(index, 1);
    newShowRows.splice(indexShow, 1);
    setResults(newRows);
    setShowResults(newShowRows);
    setEditResultId(0);
    setAddedResultId(0);
  };

  const handleSortClick = (condition: sortArg<IGameResultProps>) => {
    sort(results, condition);
    sort(showResults, condition);
    setResults([...results]);
    setShowResults([...showResults]);
  };

  const handleSearchChange = (e: React.SyntheticEvent, value: PlayerProps | null) => {
    const index = results.findIndex((result) => result.thirdPlaceId === 0);
    if (index !== -1) {
      results.splice(index, 1);
    }
    setShowResults(filter(value, results));
    setShowValue(value);
    setAddedResultId(0);
    setEditResultId(0);
  };

  return (
    <>
      <AutoComplete
        id="Filter"
        placeholder="Enter a name"
        onChange={(event, value) => handleSearchChange(event, value)}
        disablePortal
        options={playerList}
        sx={{ width: 210, marginLeft: 2 }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Filter Players" placeholder="Search player name" />
        )}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />
      <TableContainer component={Paper}>
        <Table sx={TableSX} aria-label="simple table">
          <TableHead>
            <TableRow>
              <ResultTableCell
                title="Date"
                placeKey="gameDate"
                placeKeyMinus="-gameDate"
                handleDateSort={handleSortClick}
              />
              <ResultTableCell
                title="1st Place"
                placeKey="firstPlace"
                placeKeyMinus="-firstPlace"
                handleDateSort={handleSortClick}
              />
              <ResultTableCell
                title="2nd Place"
                placeKey="secondPlace"
                placeKeyMinus="-secondPlace"
                handleDateSort={handleSortClick}
              />
              <ResultTableCell
                title="3rd Place"
                placeKey="thirdPlace"
                placeKeyMinus="-thirdPlace"
                handleDateSort={handleSortClick}
              />
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showResults &&
              showResults.map((result) =>
                editResultId === result.id ? (
                  <EditableRow
                    key={result.id}
                    editStoredData={editStoredData}
                    handleDateChange={handleDateChange}
                    handleResultsChange={handleResultsChange}
                    handleEditSubmit={handleEditSubmit}
                    handleCancelClick={handleCancelClick}
                    handleDeleteClick={handleDeleteClick}
                    playerList={playerList}
                    resultId={result.id}
                    editState={editState}
                  />
                ) : (
                  <ReadOnlyRow
                    key={result.id}
                    result={result}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    editResultId={editResultId}
                  />
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResultsTable;
