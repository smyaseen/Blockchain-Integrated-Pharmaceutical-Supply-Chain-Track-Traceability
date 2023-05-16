/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  useAccount,
  useConnect,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { disconnect } from '@wagmi/core';
import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import RouteNames from '../routes/RouteNames';
import Roles, { bytes32Roles, RoleTypes } from '../utility/roles';
import AuthForm from '../components/auth/AuthForm';
import { SELECT, TEXT_FIELD } from '../components/auth/AuthForm/FieldTypes';
import {
  fieldChangeHandler,
  validateOnSubmit,
} from '../components/auth/AuthForm/AuthUtils';
import {
  ACCESS_CONTROL_CONTRACT_ADDRESS,
  setFieldsDisabled,
} from '../utility/utils';
import AccessControl from '../contracts/AccessControl.json';

interface userData {
  name: string;
  address: string;
  role: string;
}

const signUpUser = async (signUpData: userData) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(signUpData),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  return { data, status: response.status };
};

const SignUp = () => {
  const [responseError, setResponseError] = useState('');

  const [fields, setFields] = useState([
    {
      type: TEXT_FIELD,
      textFieldType: 'text',
      name: 'name',
      label: 'Name',
      variant: 'outlined',
      value: '',
      errorMessage: '',
      fullWidth: true,
      margin: 'normal',
      onChange: (
        { target: { value } }: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const updatedFields = fieldChangeHandler(fields, value, index) as any;
        setFields(updatedFields);
      },
      getValidation: (value: string) => {
        if (!value) {
          return 'Invalid name';
        }
        return '';
      },
    },

    {
      type: SELECT,
      label: 'Role',
      value: '',
      errorMessage: '',
      menuItems: [
        { menuValue: Roles.manufacturer, menuName: 'Manufacturer' },
        { menuValue: Roles.distributor, menuName: 'Distributor' },
        { menuValue: Roles.pharmacy, menuName: 'Pharmacy' },
      ],
      onChange: (
        { target: { value } }: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const updatedFields = fieldChangeHandler(fields, value, index) as any;
        setFields(updatedFields);
      },
    },
  ]);

  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const { mutateAsync, isLoading } = useMutation(signUpUser, {
    onSuccess: async ({ data, status }) => {
      if (status !== 201) {
        setResponseError(data.message);
        disconnect();
      } else {
        const result = await signIn('credentials', {
          address,
          name: fields[0].value,
          role: fields[1].value,
        });
        setFields(setFieldsDisabled(false, fields) as any);

        if (result && !result.error) {
          Router.push('');
        }
      }
    },
  });

  const { config, isFetchedAfterMount, isFetching } = usePrepareContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: 'grantRole',
    args: [fields[0].value, bytes32Roles[fields[1].value as keyof RoleTypes]],
  });

  const { writeAsync, error: writeError, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (address && isConnected && isFetchedAfterMount && writeAsync) {
      (async () => {
        await writeAsync();
      })();
    }
  }, [address, isFetchedAfterMount]);

  useEffect(() => {
    if (isSuccess) {
      (async () => {
        await mutateAsync({
          name: fields[0].value,
          role: fields[1].value,
          address: address as string,
        });
      })();
    }
  }, [isSuccess]);

  const saveHandler = async () => {
    const { validateArray, isValid } = validateOnSubmit(fields, true) as any;
    if (isValid) {
      setFields(setFieldsDisabled(true, validateArray) as any);

      try {
        connect({ connector: connectors[0] });
      } catch (error: any) {
        setResponseError('Metamask Connect failed!');
      }
    } else setFields(validateArray);
  };

  useEffect(() => {
    if (writeError) {
      const regex = /reverted with reason string '([^']+)'/;
      const match = writeError.message.match(regex);
      const reasonString = match ? match[1] : '';

      setResponseError(`Error Signing Up: ${reasonString || ''}`);

      disconnect();
    } else {
      setResponseError('');
    }
  }, [writeError]);

  const buttons = [
    {
      name: 'Sign Up Now',
      color: 'primary' as const,
      fullWidth: true,
      size: 'large' as const,
      disabled: !!(isConnected && isFetchedAfterMount && writeAsync),
      variant: 'contained' as const,
      loading: isFetching || isLoading,
      onClick: saveHandler,
    },
  ];

  const footerButtons = [
    {
      text: `Have a look at Dispatched Batches`,
      btnText: 'Browse Batches',
      onClick: () => {
        Router.push(RouteNames.root);
      },
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        height: '100%',
      }}
    >
      <Grid container sx={{ flex: '1 1 auto' }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <AuthForm
            fields={fields}
            buttons={buttons}
            responseError={responseError}
            heading="Create a new account"
            title="Register"
            subHeading="Use your Metamask Wallet to create a new account"
            footerButtons={footerButtons}
          />
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background:
              'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%',
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              // sx={{
              //   fontSize: '24px',
              //   lineHeight: '32px',
              //   mb: 1,
              // }}
              variant="h4"
            >
              Welcome to{' '}
              <Typography variant="h4" component="span" color="primary">
                Blockchain Integrated Supply Chain
              </Typography>
            </Typography>
            <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
              Empowering Pharma Track and Traceability with Blockchain
              Technology
            </Typography>
            <Box
              sx={{
                display: 'flex',
              }}
              justifyContent="center"
            >
              <img
                alt=""
                src="https://lh3.googleusercontent.com/u/2/drive-viewer/AFGJ81pwaqFWYu_nyqg_lApNQWi9JLZcsTtFVQIgiBl3TB3J5llADaVXi2lqLvPPG9W57WU5tDLlCY1cCTRbO9c1cJ49bHE1SQ=w2880-h1528"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
