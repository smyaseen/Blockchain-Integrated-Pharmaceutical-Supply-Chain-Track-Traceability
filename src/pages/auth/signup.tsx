import React from 'react';
import Head from 'next/head';
// import NextLink from 'next/link';
import {
  Box,
  Button,
  //   Checkbox,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  //   Link,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import RouteNames from '../../routes/RouteNames';
import Roles from '../../utility/roles';

const Register = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <form
            onSubmit={() => {
              //
            }}
          >
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              //   error={Boolean(
              //     formik.touched.firstName && formik.errors.firstName
              //   )}
              fullWidth
              //   helperText={formik.touched.firstName && formik.errors.firstName}
              label="Name"
              margin="normal"
              name="name"
              //   onBlur={formik.handleBlur}
              //   onChange={formik.handleChange}
              //   value={formik.values.firstName}
              variant="outlined"
            />

            <TextField
              //   error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              //   helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              //   onBlur={formik.handleBlur}
              //   onChange={formik.handleChange}
              type="email"
              //   value={formik.values.email}
              variant="outlined"
            />
            <TextField
              //   error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              //   helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              //   onBlur={formik.handleBlur}
              //   onChange={formik.handleChange}
              type="password"
              //   value={formik.values.password}
              variant="outlined"
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label-id"
                id="role-select"
                // value={age}
                label="Role"
                onChange={() => {
                  //
                }}
              >
                <MenuItem value={Roles.manufacturer}>Manufacturer</MenuItem>
                <MenuItem value={Roles.distributor}>Distributor</MenuItem>
                <MenuItem value={Roles.pharmacy}>Pharmacy</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account? {/* <NextLink href="/auth/login" passHref> */}
              <Button
                onClick={() => {
                  router.push(RouteNames.login);
                }}
              >
                Sign In
              </Button>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
