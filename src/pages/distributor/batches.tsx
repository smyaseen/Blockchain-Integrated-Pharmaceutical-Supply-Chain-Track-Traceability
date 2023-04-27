/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import BatchListResults from '../../components/distributor/batches';
import RouteNames from '../../routes/RouteNames';

const ManufacturerBatches = () => {
  const { data } = useSession() as any;

  const {
    isLoading,
    data: batches,
    refetch,
  } = useQuery(
    'batches',
    async () => {
      try {
        const stream = await fetch(`/api/batch?distributor=${data.name}`);
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

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Head>
        <title>Batches</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Dispatched Batches
          </Typography>
          <Box sx={{ mt: 3 }}>
            {isLoading ? (
              <CircularProgress />
            ) : !batches?.length ? (
              <Typography sx={{ m: 1 }} variant="h6">
                No Batches Available
              </Typography>
            ) : (
              <BatchListResults
                batchRoute={RouteNames.distributorBatches}
                batches={batches}
                refetch={refetch}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ManufacturerBatches;
