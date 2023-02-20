import * as React from 'react';
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Service from '../Service';

export default function Application() {
    const [application, setApplication] = useState([]);

    useEffect(()=>{
        Service.getPublic().then(data=>{
            setApplication(Object.entries(data));
        })
    }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} style={{ tableLayout: 'fixed' }} aria-label="simple table">
        <TableBody>
          {application.map((x) => (
            <TableRow
              key={x[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="right" scope="row">
                {x[1]}
              </TableCell>
              <TableCell component="th" scope="row" style={{textTransform:'uppercase'}}>
                {x[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}