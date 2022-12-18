import React, { useState } from 'react';

import Router from 'next/router';
import RouteNames from '../../routes/RouteNames';
import Roles from '../../utility/roles';
import AuthForm from '../../components/auth/AuthForm';
import { SELECT, TEXT_FIELD } from '../../components/auth/AuthForm/FieldTypes';
import {
  emailRegex,
  fieldChangeHandler,
  passwordRegex,
  validateOnSubmit,
} from '../../components/auth/AuthForm/AuthUtils';

const Register = () => {
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

  const saveHandler = () => {
    const {
      validateArray,
      //  isValid
    } = validateOnSubmit(fields, true) as any;
    setFields(validateArray);
  };

  const buttons = [
    {
      name: 'Sign Up Now',
      color: 'primary' as const,
      fullWidth: true,
      size: 'large' as const,
      variant: 'contained' as const,
      loading: false,
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
      responseError=""
      heading="Create a new account"
      title="Register"
      subHeading="Use your email to create a new account"
      footerText="Have an account?"
      footerButton={footerButton}
    />
  );
};

export default Register;
