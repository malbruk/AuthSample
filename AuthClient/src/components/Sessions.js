import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Service from "../Service";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    Service.getPrivate().then((data) => {
        console.log('sessions', data)
      setSessions(data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>מזהה</TableCell>
            <TableCell>מזהה משתמש</TableCell>
            <TableCell>תאריך ושעה</TableCell>
            <TableCell>כתובת IP</TableCell>
            <TableCell>האם בתוקף</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.dateTime}</TableCell>
              <TableCell>{row.ip}</TableCell>
              <TableCell>{row.isValid ? 'כן' : 'לא'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
