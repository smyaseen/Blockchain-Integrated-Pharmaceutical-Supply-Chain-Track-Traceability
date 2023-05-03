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
import RouteNames from '../routes/RouteNames';
import Roles, { bytes32Roles, RoleTypes } from '../utility/roles';
import AuthForm from '../components/auth/AuthForm';
import { SELECT, TEXT_FIELD } from '../components/auth/AuthForm/FieldTypes';
import {
  fieldChangeHandler,
  validateOnSubmit,
} from '../components/auth/AuthForm/AuthUtils';
import { setFieldsDisabled } from '../utility/utils';
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

const ACCESS_CONTROL_CONTRACT_ADDRESS =
  '0x5FbDB2315678afecb367f032d93F642f64180aa3';

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

  const { write, error: writeError, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (address && isConnected && isFetchedAfterMount && write) {
      write();
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
      disabled: !!(isConnected && isFetchedAfterMount && write),
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
    <AuthForm
      fields={fields}
      buttons={buttons}
      responseError={responseError}
      heading="Create a new account"
      title="Register"
      subHeading="Use your email to create a new account"
      footerButtons={footerButtons}
    />
  );
};

export default SignUp;
