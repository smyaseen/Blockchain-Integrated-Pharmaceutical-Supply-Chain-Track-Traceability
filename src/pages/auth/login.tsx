/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
// import withAuth from '../../routes/withAuth';
import RouteNames from '../../routes/RouteNames';
import { TEXT_FIELD } from '../../components/auth/AuthForm/FieldTypes';
import AuthForm from '../../components/auth/AuthForm';
import {
  emailRegex,
  fieldChangeHandler,
  passwordRegex,
  validateOnSubmit,
} from '../../components/auth/AuthForm/AuthUtils';

// eslint-disable-next-line arrow-body-style
const Login: NextPage = () => {
  const [fields, setFields] = useState([
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
  ]);

  const saveHandler = () => {
    const {
      validateArray,
      //  isValid
    } = validateOnSubmit(fields, true) as any;
    setFields(validateArray);
  };

  const buttons = [
    {
      name: 'Sign In Now',
      color: 'primary' as const,
      fullWidth: true,
      size: 'large' as const,
      variant: 'contained' as const,
      loading: false,
      onClick: saveHandler,
    },
  ];

  const footerButton = {
    text: 'Sign Up',
    onClick: () => {
      Router.push(RouteNames.signup);
    },
  };

  return (
    <AuthForm
      fields={fields}
      buttons={buttons}
      responseError=""
      heading="Sign in"
      title="Login"
      subHeading="Sign in on the internal platform"
      footerText="Don't have an account?"
      footerButton={footerButton}
    />
  );
};

// export default withAuth(Login)('');
export default Login;
