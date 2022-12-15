import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
// import withAuth from '../../routes/withAuth';
import RouteNames from '../../routes/RouteNames';
import { TEXT_FIELD } from '../../components/auth/AuthForm/FieldTypes';
import AuthForm from '../../components/auth/AuthForm';

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
      // onChange: () => {
      //   // const updatedFields = fieldChangeHandler(fields, value, index);
      //   // setFields(updatedFields);
      // },
      // getValidation: () => {
      //   //
      // },
    },
    {
      type: TEXT_FIELD,
      textFieldType: 'password',
      label: 'Password',
      name: 'password',
      variant: 'outlined',
      value: '',
      errorMessage: '',
      // onChange: () => {
      //   // const updatedFields = fieldChangeHandler(fields, value, index);
      //   // setFields(updatedFields);
      // },
      // getValidation: () => {
      //   //
      // },
    },
  ]);

  const buttons = [
    {
      name: 'Sign In Now',
      color: 'primary',
      fullWidth: true,
      size: 'large',
      type: 'submit',
      variant: 'contained',
      loading: false,
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
