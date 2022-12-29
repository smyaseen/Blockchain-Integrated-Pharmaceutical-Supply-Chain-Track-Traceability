/* eslint-disable react/jsx-filename-extension */
import { Box } from '@mui/material';
import React from 'react';
import BatchProgress from '../../components/manufacturer/BatchProgress';

const seeBatch = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 1,
      m: 4,
    }}
  >
    <BatchProgress />
  </Box>
);

export default seeBatch;
