import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { resultsUrl, playersUrl } from "../api/endpoints";
import sendRequest from "../api/fetch";
import ResultsTable from "../components/resultsTable/ResultsTable";
import { PlayerProps, IGameResultProps } from "../components/resultsTable/ResultsTableInterfaces";
import Banner from "../components/banner/Banner";

const ResultsPage: React.FunctionComponent = () => {
  const { id } = useParams();
  const [results, setResults] = useState<Array<IGameResultProps>>([]);
  const [playerList, setPlayerList] = useState<Array<PlayerProps>>([]);
  const [addedResultId, setAddedResultId] = useState(0);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [groupId, setGroupId] = useState(0);

  useEffect(() => {
    const getResponseResults = async () => {
      const res = await sendRequest(`${resultsUrl}/group/${id}`, "GET", "");
      setResults(JSON.parse(res.message));
      setFetchStatus(true);
    };
    const getResponsePlayers = async () => {
      const res = await sendRequest(playersUrl, "GET", "");
      setPlayerList(JSON.parse(res.message));
    };
    getResponseResults();
    getResponsePlayers();
    if (id !== undefined) {
      setGroupId(+id);
    }
  }, []);

  const handleAddClick = () => {
    let addId: number;
    if (results.length > 0) {
      addId = Math.max(...results.map((result) => result.id)) + 1;
    } else {
      addId = 1;
    }
    const empty: IGameResultProps = {
      id: addId,
      gameDate: "",
      firstPlace: "",
      firstPlaceId: 0,
      secondPlace: "",
      secondPlaceId: 0,
      thirdPlace: "",
      thirdPlaceId: 0,
    };
    setResults([...results, empty]);
    setAddedResultId(empty.id);
    setAddButtonClicked(!addButtonClicked);
  };

  return (
    <>
      <Banner title="Results page" />
      <div>
        <ResultsTable
          playerList={playerList}
          results={results}
          setResults={setResults}
          addedResultId={addedResultId}
          addButtonClicked={addButtonClicked}
          setAddedResultId={setAddedResultId}
          fetchStatus={fetchStatus}
          resultGroupId={groupId}
        />
      </div>
      <Typography align="center">
        <Button
          variant="contained"
          type="submit"
          onClick={handleAddClick}
          sx={{ marginTop: 3, marginLeft: -8 }}
          disabled={addedResultId > 0 || addedResultId === -10}
        >
          Add Result
        </Button>
      </Typography>
    </>
  );
};

export default ResultsPage;
