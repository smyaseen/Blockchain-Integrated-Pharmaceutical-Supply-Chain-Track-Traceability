import React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import BatchListResults from '../../components/manufacturer/BatchListResults';
import { batches } from '../../components/manufacturer/_data_';

const ManufacturerBatches = () => (
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
        <Box sx={{ mt: 3 }}>
          <BatchListResults products={batches} />
        </Box>
      </Container>
    </Box>
  </>
);

export default ManufacturerBatches;
