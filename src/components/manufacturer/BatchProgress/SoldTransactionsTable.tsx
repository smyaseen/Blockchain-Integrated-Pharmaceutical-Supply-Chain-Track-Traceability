import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';

const createData = (
  name: string,
  stock: number,
  sold: number,
  history: Array<{
    date: string;
    amount: number;
  }>
) => ({
  name,
  stock,
  sold,
  history,
});

const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.stock}</TableCell>
        <TableCell align="center">{row.sold}</TableCell>
        <TableCell align="center">
          <Button variant="text">View Transaction</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row" align="center">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">
                        <Button variant="text">View Transaction</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const rows = [
  createData('Pharmacy A', 159, 6.0, [
    {
      date: '2020-01-05',
      amount: 3,
    },
    {
      date: '2020-01-02',
      amount: 1,
    },
  ]),
];

const SoldTransactionsTable = () => (
  <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Pharmacy</TableCell>
          <TableCell align="center">Stock</TableCell>
          <TableCell align="center">Sold</TableCell>
          <TableCell align="center">Transaction</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <Row key={row.name} row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SoldTransactionsTable;
