import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Container,
  Button,
  Grid,
  Link as MUILink,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import withAuth from '../../routes/withAuth';

// eslint-disable-next-line arrow-body-style
const Login: NextPage = () => {
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
          <Button component="a" startIcon={null}>
            Dashboard
          </Button>
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={null}
                  onClick={() => {
                    //
                  }}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color="error"
                  fullWidth
                  onClick={() => {
                    //
                  }}
                  size="large"
                  startIcon={null}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
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
              <MUILink
                href="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: 'pointer',
                }}
              >
                Sign Up
              </MUILink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

// export default withAuth(Login)('');
export default Login;
