import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Container,
  Button,
  Grid,
  // Link as MUILink,
  TextField,
  Typography,
} from '@mui/material';
// import Link from 'next/link';
import { useRouter } from 'next/router';
// import withAuth from '../../routes/withAuth';
import RouteNames from '../../routes/RouteNames';

// eslint-disable-next-line arrow-body-style
const Login: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
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
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>

            <TextField
              error={false}
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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{' '}
              <Button
                onClick={() => {
                  router.push(RouteNames.signup);
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

// export default withAuth(Login)('');
export default Login;
