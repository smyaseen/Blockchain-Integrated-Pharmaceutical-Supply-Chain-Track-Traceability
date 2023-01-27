import { Box } from '@mui/material';
import React from 'react';
import BatchProgressComp from '../../components/manufacturer/BatchProgress';
import SoldTransactionsTable from '../../components/manufacturer/BatchProgress/SoldTransactionsTable';

const BatchProgress = () => (
  <>
    <Box margin="auto" mt={4} maxWidth={500}>
      <BatchProgressComp />
    </Box>
    <Box m={3}>
      <SoldTransactionsTable />
    </Box>
  </>
);

export default BatchProgress;
