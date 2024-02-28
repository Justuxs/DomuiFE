import React, { SyntheticEvent, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AutoComplete from "@mui/material/Autocomplete";
import ResultCard from "../components/resultsGroups/ResultCard";
import { resultsGroupsUrl } from "../api/endpoints";
import sendRequest from "../api/fetch";
import CreateResultCard from "../components/resultsGroups/CreateResultCard";
import Banner from "../components/banner/Banner";

interface IResultGroups {
  id: number;
  name: string;
}

const ResultsGroupsPage: React.FunctionComponent = () => {
  const [title, setTitle] = useState("");
  const [resultGroups, setResultGroups] = useState<Array<IResultGroups>>([]);
  const [showResultGroups, setShowResultGroups] = useState<Array<IResultGroups>>([]);
  const [searchState, setSearchState] = useState(false);

  useEffect(() => {
    const getResponseResultsGroups = async () => {
      const res = await sendRequest(resultsGroupsUrl, "GET", "");
      setResultGroups(JSON.parse(res.message));
      setShowResultGroups(JSON.parse(res.message));
    };
    getResponseResultsGroups();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (title !== "") {
      const res = await sendRequest(resultsGroupsUrl, "POST", JSON.stringify({ name: title }));
      setResultGroups([JSON.parse(res.message), ...resultGroups]);
      setShowResultGroups([JSON.parse(res.message), ...resultGroups]);
      setTitle("");
    }
  };

  const handleDelete = async (resultGroupId: number) => {
    const newResultGroups: IResultGroups[] = [...resultGroups];
    const newShowResultGroups: IResultGroups[] = [...showResultGroups];
    const index = resultGroups.findIndex((resultGroup) => resultGroup.id === resultGroupId);
    const indexShow = showResultGroups.findIndex((resultGroup) => resultGroup.id === resultGroupId);

    await sendRequest(`${resultsGroupsUrl}/${resultGroupId}`, "DELETE", "");

    newResultGroups.splice(index, 1);
    newShowResultGroups.splice(indexShow, 1);
    setResultGroups(newResultGroups);
    setShowResultGroups(newShowResultGroups);
  };

  const handleSearchChange = (e: React.SyntheticEvent, value: IResultGroups | null) => {
    if (value === null) {
      setShowResultGroups([...resultGroups]);
      setSearchState(false);
    } else {
      const search: IResultGroups[] = resultGroups.filter((resultGroup) => {
        return resultGroup.name === value.name;
      });
      setShowResultGroups(search);
      setSearchState(true);
    }
  };

  return (
    <>
      <Banner title="League page" />
      <AutoComplete
        id="Filter"
        placeholder="Enter a name"
        onChange={(event, value) => handleSearchChange(event, value)}
        disablePortal
        options={resultGroups}
        sx={{ width: 210, marginLeft: 2, marginBottom: 2 }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Filter Leagues" placeholder="Search League Name" />
        )}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />
      <Grid container spacing={3} style={{ display: "flex" }}>
        <CreateResultCard title={title} setTitle={setTitle} handleSubmit={handleSubmit} searchState={searchState} />
        {showResultGroups &&
          showResultGroups.map((card) => (
            <ResultCard key={card.id} id={card.id} name={card.name} handleDelete={handleDelete} />
          ))}
      </Grid>
    </>
  );
};

export default ResultsGroupsPage;
