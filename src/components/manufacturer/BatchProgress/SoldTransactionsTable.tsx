/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const { row, batches } = props;
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
          {row.title}
        </TableCell>
        <TableCell align="center">{row.stock}</TableCell>
        <TableCell align="center">{row.sold}</TableCell>
        <TableCell align="center">
          <Button
            variant="text"
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${batches.transactions[6]}`}
          >
            View Transaction
          </Button>
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
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.transactions?.map((historyRow) => (
                    <TableRow key={historyRow}>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="text"
                          target="_blank"
                          href={`https://sepolia.etherscan.io/tx/${historyRow.hash}`}
                        >
                          View Transaction
                        </Button>
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

const SoldTransactionsTable = ({ batches }: { batches: any }) => (
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
        {batches?.pharmacy?.map((row) => (
          <Row key={row.name} batches={batches} row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SoldTransactionsTable;
