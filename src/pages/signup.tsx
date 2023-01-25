/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import Router from 'next/router';
import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';
import RouteNames from '../routes/RouteNames';
import Roles from '../utility/roles';
import AuthForm from '../components/auth/AuthForm';
import { SELECT, TEXT_FIELD } from '../components/auth/AuthForm/FieldTypes';
import {
  emailRegex,
  fieldChangeHandler,
  passwordRegex,
  validateOnSubmit,
} from '../components/auth/AuthForm/AuthUtils';
import { setFieldsDisabled } from '../utility/utils';

interface userData {
  name: string;
  email: string;
  password: string;
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

const Register = () => {
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
      type: TEXT_FIELD,
      textFieldType: 'email',
      name: 'email',
      label: 'Email Address',
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
        if (!emailRegex.test(value)) {
          return 'Invalid email';
        }
        return '';
      },
    },
    {
      type: TEXT_FIELD,
      textFieldType: 'password',
      label: 'Password',
      name: 'password',
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
      getValidation: (value) => {
        if (passwordRegex.test(value) && value.length >= 8) {
          return '';
        }
        return 'Password must be 8 characters long and contains at least one number and letter';
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

  const { mutateAsync, isLoading } = useMutation(signUpUser, {
    onSuccess: async ({ data, status }) => {
      if (status !== 201) {
        setResponseError(data.message);
      } else {
        const result = await signIn('credentials', {
          redirect: false,
          email: fields[1].value,
          password: fields[2].value,
        });

        if (result && !result.error) {
          Router.push('');
        }
      }
    },
  });

  const saveHandler = async () => {
    const { validateArray, isValid } = validateOnSubmit(fields, true) as any;

    if (isValid) {
      setFields(setFieldsDisabled(true, validateArray) as any);

      await mutateAsync({
        name: validateArray[0].value,
        email: validateArray[1].value,
        password: validateArray[2].value,
        role: validateArray[3].value,
      });

      setFields(setFieldsDisabled(false, validateArray) as any);
    } else setFields(validateArray);
  };

  const buttons = [
    {
      name: 'Sign Up Now',
      color: 'primary' as const,
      fullWidth: true,
      size: 'large' as const,
      variant: 'contained' as const,
      loading: isLoading,
      onClick: saveHandler,
    },
  ];

  const footerButton = {
    text: 'Sign In',
    onClick: () => {
      Router.push(RouteNames.login);
    },
  };

  return (
    <AuthForm
      fields={fields}
      buttons={buttons}
      responseError={responseError}
      heading="Create a new account"
      title="Register"
      subHeading="Use your email to create a new account"
      footerText="Have an account?"
      footerButton={footerButton}
    />
  );
};

export default Register;
