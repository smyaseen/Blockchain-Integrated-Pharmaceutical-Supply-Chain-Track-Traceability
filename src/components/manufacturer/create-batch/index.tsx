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
import QRCode from 'react-qr-code';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import { Product } from '../_data_';
import { fetchUsers, fetchProducts } from '../../../utility/utils';
import AccessControl from '../../../contracts/AccessControl.json';
import { bytes32Roles, RoleTypes } from '../../../utility/roles';

const ACCESS_CONTROL_CONTRACT_ADDRESS =
  '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const CreateBatch = () => {
  const [values, setValues] = useState({
    medicine: '',
    quantity: '',
    distributor: { name: '', address: '' },
    expiry: new Date().toLocaleDateString(),
    mfg: new Date().toLocaleDateString(),
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [distributors, setDistributors] = useState<
    { name: string; address: string }[]
  >([]);
  const [newBatchId, setNewBatchId] = useState('');
  const [saving, setSaving] = useState(false);
  const { data } = useSession() as any;

  useEffect(() => {
    (async () => {
      if (data.name) setProducts(await fetchProducts(data.name));
      setDistributors(await fetchUsers('distributor'));
    })();
  }, []);

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
    } = await result.wait();

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
                {products.map((option) => (
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
                  const dist = distributors.find(
                    (val) => val.name === value.split('-').join(' ')
                  );
                  if (dist) handleChange(name, dist);
                }}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {distributors.map((value) => (
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
                  onChange={(value) =>
                    value &&
                    handleChange('mfg', new Date(value.$d).toLocaleDateString())
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
                    value={`http://127.0.0.1:8080?batchId=${newBatchId}`}
                  />
                  <br />
                  <Typography>Batch Id generated: </Typography>
                  <Button
                    color="primary"
                    variant="text"
                    onClick={() =>
                      Router.push(`http://127.0.0.1:8080?batchId=${newBatchId}`)
                    }
                  >
                    {`http://127.0.0.1:8080?batchId=${newBatchId}`}
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
              !isFetchedAfterMount ||
              !products.length ||
              !distributors.length ||
              saving
            }
            onClick={write}
          >
            Create Batch
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CreateBatch;
