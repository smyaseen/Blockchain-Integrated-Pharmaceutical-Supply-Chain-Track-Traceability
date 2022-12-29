/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import BatcheListResults from '../../components/manufacturer/BatcheListResults';
import { batches } from '../../components/manufacturer/_data_';

function ManufacturerBatches() {
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
          {/* <CustomerListToolbar /> */}
          <Box sx={{ mt: 3 }}>
            <BatcheListResults products={batches} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ManufacturerBatches;
