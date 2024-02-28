import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import sendRequest from "../../api/fetch";
import { leadersUrl } from "../../api/endpoints";
import NoLeaders from "./No_leader_found.png";
import Podium from "./Podium";

export interface ILeaderProps {
  place: number;
  id: number;
  name: string;
  surname: string;
  point: number;
}

export interface ILeadersTableProps {
  from: Date;
  to: Date;
  caption: string;
}

const LeadersTable: React.FunctionComponent<ILeadersTableProps> = ({ from, to, caption }) => {
  const [leadersData, setLeadersData] = useState<Array<ILeaderProps>>([]);

  function datetoString(date: Date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  const getData = () => {
    const getResponse = async () => {
      const res = await sendRequest(`${leadersUrl}/find?from=${datetoString(from)}&to=${datetoString(to)}`, "GET", "");
      setLeadersData(JSON.parse(res.message));
    };
    getResponse();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {leadersData.length > 0 ? (
        <div>
          <caption>{caption}</caption>

          <div>
            {leadersData.length > 3 && (
              <div id="podiumContainer">
                <Podium first={leadersData[0]} second={leadersData[1]} third={leadersData[2]} />
              </div>
            )}

            <Table id="LeadersTable">
              <TableHead>
                <TableRow id="LeadersTableHead">
                  <TableCell align="center">Place</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Points</TableCell>
                </TableRow>
              </TableHead>

              <TableBody id="LeadersTableRow">
                {leadersData &&
                  leadersData.map((leader) => (
                    <TableRow key={leader.id}>
                      <TableCell align="center" className="place">
                        {leader.place}
                      </TableCell>
                      <TableCell align="center">{`${leader.name} ${leader.surname}`}</TableCell>
                      <TableCell align="center">{leader.point}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <figure>
          <figcaption>{caption}</figcaption>
          <img src={NoLeaders} className="NoLeaders" alt="No leaders found" />
        </figure>
      )}
    </div>
  );
};

export default LeadersTable;
