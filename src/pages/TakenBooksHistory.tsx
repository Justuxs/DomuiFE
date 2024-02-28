import React, { useEffect, useState } from "react";
import {userUrl} from "../api/endpoints";
import sendRequest from "../api/fetch";
import "../components/PlayersTable/PlayersTableStyle.css";
import Banner from "../components/banner/Banner";
import HistoryTable from "../components/historyTable/HistoryTable";

const TakenBooksHistoryPage: React.FunctionComponent = () => {
  const [resultData, setResultData] = useState([]);

  const getData = () => {
    const getResponse = async () => {
      const res = await sendRequest(`${userUrl}/history`, "GET", "");
      if (!res.status) {
        alert(res.message);
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
    alert("Si knyga buvo paimta");
  };

  return (
    <div>
      <Banner title="Paimtų knygų istorija" />
      <HistoryTable rows={resultData} action={submitReturn} />
    </div>
  );
};

export default TakenBooksHistoryPage;
