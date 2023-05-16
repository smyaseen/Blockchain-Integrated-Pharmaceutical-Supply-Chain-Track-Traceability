/* eslint-disable react/jsx-filename-extension */
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { useQuery } from 'react-query';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Dashboard, Home } from '@mui/icons-material';

function Row(props) {
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
        <TableCell align="center">{row.initial}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Medicine Initials
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Medicine</TableCell>
                    <TableCell align="center">Initial</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.medicines?.map((historyRow) => (
                    <TableRow key={historyRow}>
                      <TableCell align="center">{historyRow.name}</TableCell>
                      <TableCell align="center">{historyRow.initial}</TableCell>
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
}

function BrowseDictionary() {
  const { status } = useSession();

  const { isLoading: usersLoading, data: users } = useQuery(
    'users',
    async () => {
      try {
        const stream = await fetch(`/api/browseUsers`);
        const res = await stream.json();

        return res;
      } catch (error) {
        return [];
      }
    },
    {
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );

  const { isLoading: initialsLoading, data: initials } = useQuery(
    'initials',
    async () => {
      try {
        const stream = await fetch(`/api/browseIntials`);
        const res = await stream.json();

        return res;
      } catch (error) {
        return [];
      }
    },
    {
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );

  return (
    <>
      <Head>
        <title>Browse Dictionary</title>
      </Head>
      {status !== 'authenticated' && (
        <Button
          // disabled={!getRoleFetched}
          onClick={() => Router.push('/')}
          endIcon={<Home />}
        >
          Go To Home
        </Button>
      )}
      <Box
        component="main"
        sx={{
          py: 8,
        }}
      >
        <Box sx={{ mt: 3, margin: 'auto' }} maxWidth="md">
          <Typography sx={{ m: 3 }} variant="h4">
            Registered Users
          </Typography>

          {usersLoading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <TableRow
                      key={row}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        <Box sx={{ mt: 3, margin: 'auto' }} maxWidth="md">
          <Typography sx={{ m: 3 }} variant="h4">
            Batch Initials
          </Typography>

          {initialsLoading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Manufacturer</TableCell>
                    <TableCell align="center">Initial</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initials?.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
}
export default BrowseDictionary;
