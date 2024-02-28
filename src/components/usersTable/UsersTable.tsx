import React, { useState } from "react";
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper } from "@mui/material";
import { TableRowSX } from "../resultsTable/ResultsTableStyles";
import AlertDialog from "../ActionDialog/Action";
import {Book} from "../../Types/Book";
import {User} from "../../Types/User";




export interface IReturnTableProps {
  rows: Array<User>;
  action: (id: string) => void;
  tittle: string;
  text: string;
  button: string;
}

const UsersTable: React.FunctionComponent<IReturnTableProps> = ({ rows, action ,tittle,text,button}) => {
  const [components] = useState(["Alert Dialog"]);
  const [ID, setID] = useState("0");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    setID(button.name);
  };

  return (
    <div>
      {rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table" id="PlayerTable">
            <TableHead id="PlayerTableHead">
              <TableRow>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Vardas</TableCell>
                <TableCell align="right">Pavarde</TableCell>
                <TableCell align="right">{button}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody id="ReturnTableRow">
              {rows &&
                rows.map((row) => (
                  <TableRow key={row.email} sx={TableRowSX}>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.surname}</TableCell>
                    <TableCell align="right">
                        <button onClick={buttonHandler} name={`${row.email}`} type="button">
                          {components.map(() => (
                            <AlertDialog
                              key={row.email}
                              tittle={tittle}
                              text={text}
                              subject={row.email}
                              action={(answer: boolean) => {
                                if (answer) {
                                  action(ID);
                                }
                              }}
                            />
                          ))}
                        </button>

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h4>Nauodotoju nerasta</h4>
      )}
    </div>
  );
};

export default UsersTable;
