import React, { useState } from "react";
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper } from "@mui/material";
import { TableRowSX } from "../resultsTable/ResultsTableStyles";
import AlertDialog from "../ActionDialog/Action";

interface IBooksProps {
  id: number;
  title: string;
  author : string;
  quantity: number;
}

export interface IPlayerTableProps {
  rows: Array<IBooksProps>;
  action: (id: string) => void;
}

const PlayersTable: React.FunctionComponent<IPlayerTableProps> = ({ rows, action }) => {
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
                <TableCell align="right">Pavadinimas</TableCell>
                <TableCell align="right">Autorius</TableCell>
                <TableCell align="right">Kiekis</TableCell>
                <TableCell align="right">Veiksmas</TableCell>
              </TableRow>
            </TableHead>

            <TableBody id="PlayerTableRow">
              {rows &&
                rows.map((row) => (
                  <TableRow key={row.id} sx={TableRowSX}>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      { row.quantity>0 ?(
                        <button onClick={buttonHandler} name={`${row.id}`} type="button">
                          {components.map(() => (
                            <AlertDialog
                              key={row.id}
                              tittle="Pasiimti"
                              text="Ar norite pasimti knyga"
                              subject={row.title}
                              action={(answer: boolean) => {
                                if (answer) {
                                  action(ID);
                                }
                              }}
                            />
                          ))}
                        </button>
                      ) : (
                        <span>" "</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h4>No players found</h4>
      )}
    </div>
  );
};

export default PlayersTable;
