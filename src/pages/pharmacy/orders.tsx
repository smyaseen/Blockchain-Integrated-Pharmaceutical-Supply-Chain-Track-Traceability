import React from 'react';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import BatchListResults from '../../components/manufacturer/batches';
import { batches } from '../../components/manufacturer/_data_';
import RouteNames from '../../routes/RouteNames';

const PharmacyOrders = () => (
  <>
    <Head>
      <title>Orders</title>
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
          Dispatched Orders
        </Typography>
        <Box sx={{ mt: 3 }}>
          <BatchListResults
            batchRoute={RouteNames.pharmacyBatchProgress}
            batches={batches}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default PharmacyOrders;
