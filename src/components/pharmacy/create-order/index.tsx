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

import { fetchUsers, fetchBatchIdsForPharmacy } from '../../../utility/utils';

const CreateBatch = () => {
  const [values, setValues] = useState({
    batchId: '',
    remaining: '',
    quantity: '',
  });

  const [batchIds, setBatchIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const { data } = useSession() as any;

  useEffect(() => {
    (async () => {
      if (data.name) setBatchIds(await fetchBatchIdsForPharmacy(data.name));
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
    const { batchId, quantity } = values;

    if (batchId && quantity) {
      try {
        await fetch('/api/order?role=pharmacy', {
          method: 'POST',
          body: JSON.stringify({
            pharmacy: data.name,
            batchId,
            quantity,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        setBatchIds(await fetchBatchIdsForPharmacy(data.name));
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
              values.quantity > values.remaining ||
              values.remaining == '' ||
              !values.quantity ||
              !values.batchId ||
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
