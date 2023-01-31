import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import RouteNames from '../routes/RouteNames';
import TrackBatch from '../components/common/TrackBatch';
import BatchProgressComp from '../components/manufacturer/BatchProgress';
import SoldTransactionsTable from '../components/manufacturer/BatchProgress/SoldTransactionsTable';

const Home = () => {
  const { status } = useSession();

  const [batchId, setBatchId] = useState(
    new URLSearchParams(window.location.search).get('batchId')
  );

  const {
    isLoading,
    data: batches,
    refetch,
  } = useQuery(
    'batches',
    async () => {
      try {
        const stream = await fetch(`/api/batch?batchId=${batchId}`);
        const res = await stream.json();

        return res;
      } catch (error) {
        return [];
      }
    }
    // ,
    // {
    //   staleTime: Infinity,
    //   refetchOnMount: true,
    // }
  );

  useEffect(() => {
    refetch();
  }, [batchId]);

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
        <TrackBatch
          setBatchId={(id) => {
            setBatchId(id);
          }}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          batches && (
            <>
              <Box margin="auto" mt={4} maxWidth={500}>
                <BatchProgressComp batches={batches} />
              </Box>
              <Box m={3}>
                <SoldTransactionsTable batches={batches} />
              </Box>
            </>
          )
        )}
      </Container>
    </>
  );
};

export default Home;
