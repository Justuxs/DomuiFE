import React, { useState } from "react";
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper } from "@mui/material";
import { TableRowSX } from "../resultsTable/ResultsTableStyles";
import {Book} from "../../Types/Book";




export interface IReturnTableProps {
  rows: Array<Book>;
  action: (id: string) => void;
}

const HistoryTable: React.FunctionComponent<IReturnTableProps> = ({ rows, action }) => {



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
              </TableRow>
            </TableHead>

            <TableBody id="ReturnTableRow">
              {rows &&
                rows.map((row) => (
                  <TableRow key={row.ISBN} sx={TableRowSX}>
                    <TableCell align="right">{row.ISBN}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h4>Knygu istorija tuscia</h4>
      )}
    </div>
  );
};

export default HistoryTable;
