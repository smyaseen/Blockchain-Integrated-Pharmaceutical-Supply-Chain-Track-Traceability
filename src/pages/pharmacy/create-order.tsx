import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import CreateBatchComp from '../../components/pharmacy/create-order';

const CreateBatch = () => (
  <>
    <Head>
      <title>Create Order</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
        m: 4,
      }}
    >
      <CreateBatchComp />
    </Box>
  </>
);

export default CreateBatch;
