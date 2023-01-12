import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';

export interface Row {
  fields: string[];
  buttons: Array<{ text: string; action: (index: number) => void }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformObject = (data: any, buttons: any) => {
  const rows: Row[] = [];

  data.forEach((row: Row) => {
    rows.push({
      fields: Object.values(row),
      buttons,
    });
  });

  return rows;
};

const CommonTable = ({ columns, rows }: { columns: string[]; rows: Row[] }) => (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: '20px',
    }}
  >
    <Table
      sx={{
        backgroundColor: 'white',
        minWidth: 650,
      }}
    >
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell>{col}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(({ fields, buttons }, index) => (
          <TableRow
            hover
            key={fields[0]}
            sx={{
              borderBottom:
                index !== rows.length - 1 ? '1.5px solid #f0f2f5' : 'none',
            }}
          >
            {fields.map((field) => (
              <TableCell>
                <Typography color="textPrimary" variant="body1">
                  {field}
                </Typography>
              </TableCell>
            ))}
            {buttons.map((btn) => (
              <TableCell>
                {/* <Button variant="contained">Create Batch</Button>{' '} */}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => btn.action(index)}
                >
                  {btn.text}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CommonTable;
