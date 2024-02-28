import React, { useEffect, useState } from "react";
import {adminUserHistory, userUrl} from "../api/endpoints";
import sendRequest from "../api/fetch";
import "../components/PlayersTable/PlayersTableStyle.css";
import Banner from "../components/banner/Banner";
import HistoryTable from "../components/historyTable/HistoryTable";
import {IReturnTableProps} from "../components/usersTable/UsersTable";

interface Iprops{
  user: string;
  back: ()=> void;
}
const AdminHistoryPage: React.FunctionComponent<Iprops> = ({ user,back}) => {
  const [resultData, setResultData] = useState([]);

  const getData = () => {
    const getResponse = async () => {
      const res = await sendRequest(`${adminUserHistory}${user}`, "GET", "");
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
      <Banner title="Admin: knygų istorija"/>
      <HistoryTable rows={resultData} action={submitReturn} />

      <button onClick={back}>Back</button>
    </div>
  );
};

export default AdminHistoryPage;
