/* eslint-disable no-unused-expressions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
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
import QRCode from 'react-qr-code';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import { useQuery } from 'react-query';
import {
  fetchUsers,
  fetchProducts,
  ACCESS_CONTROL_CONTRACT_ADDRESS,
} from '../../../utility/utils';
import AccessControl from '../../../contracts/AccessControl.json';
import { bytes32Roles, RoleTypes } from '../../../utility/roles';

const CreateBatch = () => {
  const [values, setValues] = useState({
    medicine: '',
    quantity: '',
    distributor: { name: '', address: '' },
    expiry: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toLocaleDateString(),
    mfg: new Date().toLocaleDateString(),
  });

  const [newBatchId, setNewBatchId] = useState('');
  const [saving, setSaving] = useState(false);
  const { data } = useSession() as any;

  const { data: products, isFetching: fetchingProducts } = useQuery(
    'products',
    async () => fetchProducts(data.name),
    {
      staleTime: Infinity,
      onSuccess(prods: [{ name: string }]) {
        prods.length &&
          setValues({
            ...values,
            medicine: prods[0].name,
          });
      },
    }
  );

  const { data: distributors, isFetching: fetchingDistributors } = useQuery(
    'distributors',
    async () => fetchUsers('distributor'),
    {
      staleTime: Infinity,
      onSuccess(dist: [{ name: string; address: string }]) {
        dist.length &&
          setValues({
            ...values,
            distributor: dist[0],
          });
      },
    }
  );

  const handleChange = (
    name: string,
    value: string | { name: string; address: string }
  ) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { config, isFetchedAfterMount, isFetching } = usePrepareContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: 'createBatch',
    args: [
      bytes32Roles['manufacturer' as keyof RoleTypes],
      values.distributor.address || ethers.constants.AddressZero,
      values.medicine || '',
      values.quantity || 1,
    ],
  });

  const { data: result, write, isSuccess } = useContractWrite(config);

  const saveBatch = async () => {
    setSaving(true);

    const { medicine, quantity, distributor, expiry, mfg } = values;
    const {
      logs: {
        1: {
          topics: { 1: tokenId },
        },
      },
    } = await result?.wait?.();

    const { hash } = result;

    if (medicine && quantity && distributor && expiry && mfg) {
      const stream = await fetch(
        `/api/batchId?manufacturer=${data.name}&medicine=${medicine}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const lastBatchId = await stream.json();
      try {
        const batchId = `${data.name.substring(0, 3).toUpperCase()}-${medicine
          .substring(0, 3)
          .toUpperCase()}-${parseInt(lastBatchId, 10) + 1}-${new Date()
          .toLocaleDateString('en-GB')
          .replaceAll('/', '')}`;

        await fetch('/api/batch', {
          method: 'POST',
          body: JSON.stringify({
            batchId,
            manufacturer: data.name,
            medicine,
            quantity,
            distributor: distributor.name.replaceAll('-', ' '),
            // eslint-disable-next-line radix
            tokenId: parseInt(tokenId as string),
            expiry,
            mfg,
            status: 'manufactured',
            sold: 0,
            created: new Date().toLocaleDateString('en-GB'),
            transactions: [hash],
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        setNewBatchId(batchId);
      } catch (err) {
        //
      }
    }
    setSaving(false);
  };

  useEffect(() => {
    (async () => {
      if (isSuccess && (await result)) {
        await saveBatch();
      }
    })();
  }, [isSuccess]);

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader
          subheader="Create Batch of Medicines"
          title="Create Batch"
        />
        <Divider />
        {fetchingDistributors || fetchingProducts || saving ? (
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
                    label="Select Medicine"
                    name="medicine"
                    onChange={({ target: { name, value } }) =>
                      handleChange(name, value)
                    }
                    required
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    {products?.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Select Distributor"
                    name="distributor"
                    onChange={({ target: { name, value } }) => {
                      const dist = distributors?.find(
                        (val) => val.name === value.split('-').join(' ')
                      );
                      if (dist) handleChange(name, dist);
                    }}
                    required
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    {distributors?.map((value) => (
                      <option
                        key={value.name.replaceAll(' ', '-')}
                        value={value.name.replaceAll(' ', '-')}
                      >
                        {value.name}
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
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Expiry"
                      inputFormat="DD/MM/YYYY"
                      disablePast
                      minDate={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                      }
                      onChange={(value) =>
                        value &&
                        handleChange(
                          'expiry',
                          new Date(value.$d).toLocaleDateString()
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                      value={values.expiry}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Manufacture Date"
                      inputFormat="DD/MM/YYYY"
                      disablePast
                      onChange={(value) =>
                        value &&
                        handleChange(
                          'mfg',
                          new Date(value.$d).toLocaleDateString()
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                      value={values.mfg}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item md={6} xs={12}>
                  {newBatchId && (
                    <>
                      <QRCode
                        size={50}
                        value={`${window.location.origin}?batchId=${newBatchId}`}
                      />
                      <br />
                      <Typography>Batch Id generated: </Typography>
                      <Button
                        color="primary"
                        variant="text"
                        onClick={() =>
                          Router.push(
                            `${window.location.origin}?batchId=${newBatchId}`
                          )
                        }
                      >
                        {`${window.location.origin}?batchId=${newBatchId}`}
                      </Button>
                    </>
                  )}
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
                  isFetching ||
                  !values.distributor.address ||
                  !write ||
                  !values.quantity ||
                  !isFetchedAfterMount ||
                  !products?.length ||
                  !distributors?.length ||
                  fetchingProducts ||
                  fetchingDistributors ||
                  saving
                }
                onClick={write}
              >
                Create Batch
              </Button>
            </Box>
          </>
        )}
      </Card>
    </form>
  );
};

export default CreateBatch;
