import React, { useEffect, useState } from "react";
import {
  adminUrl_allbooks,
  adminUrl_bookhistory, adminUrl_bookinfo
} from "../api/endpoints";
import sendRequest from "../api/fetch";
import "../components/PlayersTable/PlayersTableStyle.css";
import Banner from "../components/banner/Banner";
import ReturnTable from "../components/ReturnTable/ReturnTable";
import AlertDialogSlide from "../components/usersTable/AlertDialogSlide";
import { User } from "../Types/User";
import FullScreenDialog from "../components/fullDialog/FullScreenDialog";
import AdminHistoryPage from "./AdminHistory";
import AdminTable from "../components/adminTable/AdminTable";

const AdminPage: React.FunctionComponent = () => {
  const [resultData, setResultData] = useState([]);
  const [userData, setuserData] = useState<User>();
  const [usersData, setUsersData] = useState([]);

  const [open, setOpen] = React.useState(false)
  const [UserTable, setUserTable] = React.useState(false);
  const [UserHistoryTable, setUserHistoryTable] = React.useState(false);

  const [isbn,setIsbn]=  React.useState("");
  const [email,setEmail]=  React.useState("");


  const getData = () => {
    const getResponse = async () => {
      const res = await sendRequest(adminUrl_allbooks, "GET", "");
      if (!res.status) {
        alert(res.message);
        return;
      }
      setResultData(JSON.parse(res.message));
    };
    getResponse();
  };

  const getUserData = (id: string) => {
    const getResponse = async () => {
      const res = await sendRequest(`${adminUrl_bookinfo}/${id}`, "GET", "");
      if (!res.status) {
        alert(res.message);
        return;
      }
      setuserData(JSON.parse(res.message));
    };
    getResponse();
  };

  const getBookUsers = (id: string) => {
    const getResponse = async () => {
      const res = await sendRequest(`${adminUrl_bookhistory}/${id}`, "GET", "");
      if (!res.status) {
        alert(res.message);
        return;
      }
      setUsersData(JSON.parse(res.message));
    };
    getResponse();
  };

  useEffect(() => {
    getData();
  }, []);

  const submitInfo = async (id: string) => {
    //getUserData(id);
    setIsbn(id);
    getUserData(id);
    setOpen(true);
  };

  const close =() => {
    setOpen(false);
  };

  const openUserTable =() => {
    getBookUsers(isbn);
    setOpen(false);
    setUserTable(true);
  };
  const closeUserTable =() => {
    setUserTable(false);
  };
  const oneUserTableClick =(email : string) => {
    setEmail(email);
    setUserHistoryTable(true);
    setUserTable(false);
  };
  const back =() => {
    setUserHistoryTable(false);
    setUserTable(true);
  };

  return (
    <div>
      {!UserHistoryTable && <Banner title="ADMIN" /> && <AdminTable rows={resultData} action={submitInfo}  button="Info" text="Peržiureti knyga " tittle="Perziureti"/>}
      {open && <div><AlertDialogSlide  action_close={close} action_button={openUserTable} isbn={isbn}  user={userData}/></div>}
      {UserTable && <div><FullScreenDialog action_close={closeUserTable} action={oneUserTableClick} button="Istorija" text={"Peziureti istorija"} tittle="Perziureti" rows={usersData}/></div>}
      {UserHistoryTable && <div><AdminHistoryPage  user={email} back={back}/></div>}
    </div>
  );
};

export default AdminPage;
