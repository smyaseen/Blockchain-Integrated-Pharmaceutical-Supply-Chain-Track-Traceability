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
} from '@mui/material';
import QRCode from 'react-qr-code';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSession } from 'next-auth/react';
import { Product } from '../_data_';
import { fetchDistributors, fetchProducts } from '../../../utility/utils';

const CreateBatch = () => {
  const [values, setValues] = useState({
    medicine: '',
    quantity: '',
    distributor: '',
    expiry: new Date().toLocaleDateString(),
    mfg: new Date().toLocaleDateString(),
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [distributors, setDistributors] = useState<string[]>([]);
  const { data } = useSession() as any;

  useEffect(() => {
    (async () => {
      if (data.name) setProducts(await fetchProducts(data.name));
      setDistributors(await fetchDistributors());
    })();
  }, []);

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

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
                onChange={({ target: { name, value } }) =>
                  handleChange(name, value)
                }
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {distributors.map((value) => (
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
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Expiry"
                  inputFormat="DD/MM/YYYY"
                  onChange={(value) => value && handleChange('expiry', value)}
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
                  onChange={(value) => value && handleChange('mfg', value)}
                  renderInput={(params) => <TextField {...params} />}
                  value={values.mfg}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={6} xs={12}>
              <QRCode size={50} value="hey" />
              <br />
              <Button color="primary" variant="text">
                bisc.com/batch-detail?batch-getz123
              </Button>
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
            disabled={!products.length || !distributors.length}
          >
            Create Batch
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CreateBatch;
