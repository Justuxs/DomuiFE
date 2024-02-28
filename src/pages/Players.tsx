import React, { useEffect, useState } from "react";
import {bookUrl, bookUrl_getGruped, userUrl} from "../api/endpoints";
import sendRequest from "../api/fetch";
import PlayersTable from "../components/PlayersTable/PlayersTable";
import "../components/PlayersTable/PlayersTableStyle.css";
import Banner from "../components/banner/Banner";
import {getUser} from "../services/AuthService";

const PlayersPage: React.FunctionComponent = () => {
  const [resultData, setResultData] = useState([]);

  const getData = () => {
    const getResponse = async () => {
      const res = await sendRequest(bookUrl_getGruped, "GET", "");
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

  const submitTake = async (id: string) => {
    let email= getUser();
    const res = await sendRequest(`${userUrl}/take/${id}`, "POST", "");
    if (res.status) {
      alert(res.message);
      getData();
    }
    else {
      alert(res.message);
      getData();
    }
  };

  return (
    <div>
      <Banner title="Knygu pasiimimas" />
      <PlayersTable rows={resultData} action={submitTake} />
    </div>
  );
};

export default PlayersPage;
