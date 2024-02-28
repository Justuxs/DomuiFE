import React, { useEffect, useState } from "react";
import {bookUrl, bookUrl_getGruped, bookUrl_getTaken, userUrl} from "../api/endpoints";
import sendRequest from "../api/fetch";
import PlayersTable from "../components/PlayersTable/PlayersTable";
import "../components/PlayersTable/PlayersTableStyle.css";
import Banner from "../components/banner/Banner";
import {getUser} from "../services/AuthService";
import ReturnTable from "../components/ReturnTable/ReturnTable";

const TakenBooksPage: React.FunctionComponent = () => {
  const [resultData, setResultData] = useState([]);

  const getData = () => {
    const getResponse = async () => {
      const res = await sendRequest(bookUrl_getTaken, "GET", "");
      if (!res.status) {
        alert("SOMETHING WRONG");
        return;
      }
      setResultData(JSON.parse(res.message));
    };
    getResponse();
  };
  useEffect(() => {
    getData();
  }, []);

  const submitReturn = async (id: string) => {
    let email= getUser();
    const res = await sendRequest(`${userUrl}/return/${id}`, "POST", "");
    if (res.status) {
      alert(res.message);
      getData();
    }
    else alert(res.message);
  };

  return (
    <div>
      <Banner title="Knygu grazinimas" />
      <ReturnTable rows={resultData} action={submitReturn}  button="Gražinti" text="Ar norite gražinti " tittle="Gražinti"/>
    </div>
  );
};

export default TakenBooksPage;
