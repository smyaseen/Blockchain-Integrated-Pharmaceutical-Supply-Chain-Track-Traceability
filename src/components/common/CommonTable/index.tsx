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
  buttons?: Array<{
    text: string;
    color?:
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'error'
      | 'info'
      | 'warning'
      | undefined;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
    action: (index: number) => void;
  }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformObject = (data: any, buttons?: any) => {
  const rows: Row[] = [];

  data.forEach((row: Row) => {
    rows.push({
      fields: Object.values(row),
      ...(buttons ? { buttons } : {}),
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
            <TableCell key={col} align="center">
              {col}
            </TableCell>
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
            {fields
              .filter((field) => !Array.isArray(field))
              .map((field) => (
                <TableCell key={field} align="center">
                  <Typography color="textPrimary" variant="body1">
                    {field}
                  </Typography>
                </TableCell>
              ))}
            {buttons?.map((btn) => (
              <TableCell key={btn.text} align="center">
                <Button
                  variant={btn.variant ? btn.variant : 'contained'}
                  color={btn.color ? btn.color : 'primary'}
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
