/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import QRCode from 'react-qr-code';
import products from './_data_';

const distributors = [
  {
    value: 'IBL',
    label: 'IBL',
  },
  {
    value: 'getz-pharma',
    label: 'Getz Pharma',
  },
  {
    value: 'gsk',
    label: 'GSK',
  },
];

const medicines = [
  ...products.map(({ name }) => ({
    value: name.toLowerCase().replaceAll(' ', '-'),
    label: name,
  })),
];

function BatchDetail(props) {
  const [values, setValues] = useState({
    medicine: '',
    quantity: '',
    distributor: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <form autoComplete="off" noValidate {...props}>
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
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {medicines.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Distributor"
                name="distributor"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {distributors.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                onChange={handleChange}
                required
                value={values.state}
                variant="outlined"
              />
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
          <Button color="primary" variant="contained">
            Create Batch
          </Button>
        </Box>
      </Card>
    </form>
  );
}

export default BatchDetail;
