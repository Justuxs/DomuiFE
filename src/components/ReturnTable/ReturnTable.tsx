import React, { useState } from "react";
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper } from "@mui/material";
import { TableRowSX } from "../resultsTable/ResultsTableStyles";
import AlertDialog from "../ActionDialog/Action";
import {Book} from "../../Types/Book";




export interface IReturnTableProps {
  rows: Array<Book>;
  action: (id: string) => void;
  tittle: string;
  text: string;
  button: string;
}

const ReturnTable: React.FunctionComponent<IReturnTableProps> = ({ rows, action ,tittle,text,button}) => {
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
                <TableCell align="right">ISBN</TableCell>
                <TableCell align="right">Pavadinimas</TableCell>
                <TableCell align="right">Autorius</TableCell>
                <TableCell align="right">{button}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody id="ReturnTableRow">
              {rows &&
                rows.map((row) => (
                  <TableRow key={row.ISBN} sx={TableRowSX}>
                    <TableCell align="right">{row.ISBN}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">
                        <button onClick={buttonHandler} name={`${row.ISBN}`} type="button">
                          {components.map(() => (
                            <AlertDialog
                              key={row.ISBN}
                              tittle={tittle}
                              text={text}
                              subject={row.title}
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
        <h4>Knygu nerasta</h4>
      )}
    </div>
  );
};

export default ReturnTable;
