/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useSession } from 'next-auth/react';

import { useQuery } from 'react-query';
import { usePrepareContractWrite } from 'wagmi';
import {
  fetchUsers,
  fetchBatchIdsForDistributor,
} from '../../../utility/utils';
import AccessControl from '../../../contracts/AccessControl.json';

const initialValue = {
  batchId: '',
  remaining: 0,
  quantity: 0,
  pharmacy: '',
  tokenId: 0,
};

const ACCESS_CONTROL_CONTRACT_ADDRESS =
  '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const CreateBatch = () => {
  const [values, setValues] = useState<{
    batchId: string;
    remaining: number;
    quantity: number;
    pharmacy: string;
    tokenId: number;
  }>(initialValue);

  const [saving, setSaving] = useState(false);
  const { data } = useSession() as any;

  const { data: batchIds, isFetching: fetchingBatchIds } = useQuery(
    'batchIds',
    async () => fetchBatchIdsForDistributor(data.name),
    {
      staleTime: Infinity,
      onSuccess(
        ids: [
          { batchId: string; quantity: number; sold: number; tokenId: number }
        ]
      ) {
        ids.length &&
          setValues({
            ...values,
            batchId: ids[0].batchId,
            remaining: ids[0].quantity - ids[0].sold,
            quantity: ids[0].quantity,
            tokenId: ids[0].tokenId,
          });
      },
    }
  );

  const { data: pharmacies, isFetching: fetchingPharmacies } = useQuery(
    'pharmacies',
    async () => fetchUsers('pharmacy'),
    {
      staleTime: Infinity,
      onSuccess(pharms: { name: string; address: string }[]) {
        pharms.length &&
          setValues({
            ...values,
            pharmacy: pharms[0].name.replaceAll(' ', '-'),
          });
      },
    }
  );

  // const { config, isFetchedAfterMount, isFetching } = usePrepareContractWrite({
  //   address: ACCESS_CONTROL_CONTRACT_ADDRESS,
  //   abi: AccessControl,
  //   functionName: 'createBatch',
  //   args: [

  //   ],
  // });

  // const { data: result, write, isSuccess } = useContractWrite(config);

  const handleChange = (name: string, value: string, remaining?: number) => {
    setValues({
      ...values,
      [name]: value,
      ...(remaining ? { remaining } : {}),
    });
  };

  const saveOrder = async () => {
    setSaving(true);
    const { batchId, quantity, pharmacy } = values;

    if (batchId && quantity && pharmacy) {
      try {
        await fetch('/api/order', {
          method: 'POST',
          body: JSON.stringify({
            batchId,
            quantity,
            pharmacy: pharmacy.replaceAll('-', ' '),
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        setValues(initialValue);
      } catch (err) {
        //
      }
    }
    setSaving(false);
  };
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <>
          <CardHeader
            subheader="Create Order from Batches"
            title="Create Order"
          />
          <Divider />
          {fetchingPharmacies || fetchingBatchIds ? (
            <Box
              sx={{
                display: 'flex',
              }}
              justifyContent="center"
              mt={2}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select Batch Id"
                      name="batchId"
                      onChange={({ target: { name, value } }) => {
                        const batch = batchIds?.find(
                          ({ batchId }) => batchId === value
                        );
                        handleChange(
                          name,
                          value,
                          !batch?.quantity && !batch?.sold
                            ? batch?.quantity
                            : batch.quantity - batch.sold
                        );
                      }}
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={values.batchId}
                    >
                      {batchIds?.map((option) => (
                        <option key={option.batchId} value={option.batchId}>
                          {option.batchId}
                        </option>
                      ))}
                    </TextField>
                    <Typography variant="h6">
                      Remaining: {values.remaining}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select Pharmacy"
                      name="pharmacy"
                      onChange={({ target: { name, value } }) => {
                        handleChange(name, value);
                      }}
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={values.pharmacy}
                    >
                      {pharmacies?.map(({ name }) => (
                        <option
                          key={name.replaceAll(' ', '-')}
                          value={name.replaceAll(' ', '-')}
                        >
                          {name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Quantity"
                      name="quantity"
                      onChange={({ target: { name, value } }) =>
                        handleChange(name, value)
                      }
                      required
                      variant="outlined"
                      value={values.quantity}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  disabled={
                    !batchIds?.length ||
                    !pharmacies?.length ||
                    values.quantity > values.remaining ||
                    !values.remaining ||
                    !values.quantity ||
                    !values.batchId ||
                    !values.pharmacy ||
                    saving
                  }
                  onClick={saveOrder}
                >
                  Create Order
                </Button>
              </Box>
            </>
          )}
        </>
      </Card>
    </form>
  );
};

export default CreateBatch;
