import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import AutoComplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CreateTournament from "../components/tournamentMenu/CreateTournament";
import sendRequest from "../api/fetch";
import { tournamentUrl } from "../api/endpoints";
import TournamentCard from "../components/tournamentMenu/TournamentCard";
import { TournamentBE } from "../components/tournamentTable/TournamentModels";
import Banner from "../components/banner/Banner";

const TournamentPage: React.FC = () => {
  const [data, setData] = useState<TournamentBE[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<Array<TournamentBE>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await sendRequest(`${tournamentUrl}`, "GET", "");
      setData(JSON.parse(res.message));
      setFilteredData(JSON.parse(res.message));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleCreate = async (tournamentObj: TournamentBE): Promise<void> => {
    const response = await sendRequest(`${tournamentUrl}`, "POST", JSON.stringify(tournamentObj));
    const result = JSON.parse(response.message);
    setData([
      { ...result },
      ...data.map((prevState) => {
        return { ...prevState };
      }),
    ]);
    setFilteredData([
      { ...result },
      ...filteredData.map((prevState) => {
        return { ...prevState };
      }),
    ]);
  };

  const handleDelete = async (id: number): Promise<void> => {
    setData(data.filter((tournament) => tournament.id !== id));
    setFilteredData(filteredData.filter((tournament) => tournament.id !== id));
    await sendRequest(`${tournamentUrl}/${id}`, "DELETE", "");
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5rem", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  const handleSearchChange = (e: React.SyntheticEvent, value: TournamentBE | null) => {
    if (value === null) {
      setFilteredData([...data]);
    } else setFilteredData(data.filter((tournament) => tournament.name === value?.name));
  };

  return (
    <>
      <Banner title="Tournaments page" />
      <AutoComplete
        id="Filter"
        onChange={(event, value) => handleSearchChange(event, value)}
        placeholder="Enter tournament name"
        disablePortal
        options={data}
        sx={{ width: 205, marginLeft: 2, marginBottom: 2 }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Filter Tournaments" placeholder="Search Tournament" />
        )}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />
      <Grid container spacing={3} style={{ display: "flex" }}>
        <CreateTournament handleCreate={handleCreate} />
        {filteredData &&
          filteredData.map((tournament) => (
            <TournamentCard key={tournament.id} id={tournament.id} name={tournament.name} handleDelete={handleDelete} />
          ))}
      </Grid>
    </>
  );
};

export default TournamentPage;
