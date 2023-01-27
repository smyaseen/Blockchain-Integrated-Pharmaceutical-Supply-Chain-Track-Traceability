import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import RouteNames from '../routes/RouteNames';
import TrackBatch from '../components/common/TrackBatch';
import BatchProgressComp from '../components/manufacturer/BatchProgress';
import SoldTransactionsTable from '../components/manufacturer/BatchProgress/SoldTransactionsTable';

const Home = () => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Track Batch</title>
      </Head>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography color="textPrimary" variant="h4">
            Track Your Batch
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {status !== 'authenticated' && (
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Have an account?
            </Typography>
            <Button onClick={() => Router.push(RouteNames.login)}>
              Sign In
            </Button>
          </Grid>
        )}

        {status !== 'authenticated' && (
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Don&apos;t have an account?
            </Typography>
            <Button onClick={() => Router.push(RouteNames.signup)}>
              Sign Up
            </Button>
          </Grid>
        )}
      </Grid>
      <Container sx={{ mt: 5 }} maxWidth={false}>
        <TrackBatch />
        <Box margin="auto" mt={4} maxWidth={500}>
          <BatchProgressComp />
        </Box>
        <Box m={3}>
          <SoldTransactionsTable />
        </Box>
      </Container>
    </>
  );
};

export default Home;
