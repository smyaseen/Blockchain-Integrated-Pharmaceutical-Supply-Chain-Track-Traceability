/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { v4 as uuid } from 'uuid';
import CustomerListResults from '../../components/manufacturer/CustomerListResults';
import CustomerListToolbar from '../../components/manufacturer/CustomerListToolbar';

function ManufacturerProducts() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ManufacturerProducts;
