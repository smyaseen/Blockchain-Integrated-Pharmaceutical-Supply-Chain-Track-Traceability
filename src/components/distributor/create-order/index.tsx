/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useSession } from 'next-auth/react';

import {
  fetchUsers,
  fetchBatchIdsForDistributor,
} from '../../../utility/utils';

const CreateBatch = () => {
  const [values, setValues] = useState({
    batchId: '',
    remaining: 0,
    quantity: '',
    pharmacy: '',
  });

  const [batchIds, setBatchIds] = useState([]);
  const [pharmacies, setPharmacies] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const { data } = useSession() as any;

  useEffect(() => {
    (async () => {
      if (data.name) setBatchIds(await fetchBatchIdsForDistributor(data.name));
      setPharmacies(await fetchUsers('pharmacy'));
    })();
  }, []);

  useEffect(() => {
    console.log('values', values);
  }, [values]);

  const handleChange = (name: string, value: string, remaining?: number) => {
    console.log(
      '🚀 ~ file: index.tsx:43 ~ handleChange ~ name: string, value: string',
      name,
      value
    );
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
            pharmacy,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        setBatchIds(await fetchBatchIdsForDistributor(data.name));
        setValues({});
      } catch (err) {
        //
      }
    }
    setSaving(false);
  };
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader
          subheader="Create Order from Batches"
          title="Create Order"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Batch Id"
                name="batchId"
                onChange={({ target: { name, value } }) => {
                  const batch = batchIds.find(
                    ({ batchId }) => batchId === value
                  );
                  handleChange(name, value, batch.quantity - batch.sold);
                }}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
                value={values.batchId}
              >
                {batchIds.map((option) => (
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
                  console.log(name, value);
                  handleChange(name, value);
                }}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
                value={values.pharmacy}
              >
                {pharmacies.map((value) => (
                  <option
                    key={value.replaceAll(' ', '-')}
                    value={value.replaceAll(' ', '-')}
                  >
                    {value}
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
        {console.log(values)}
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
              !batchIds.length ||
              !pharmacies.length ||
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
      </Card>
    </form>
  );
};

export default CreateBatch;
