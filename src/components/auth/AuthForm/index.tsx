import React, { FocusEventHandler, Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  ButtonPropsColorOverrides,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { SELECT, TEXT_FIELD } from './FieldTypes';

interface FieldProp {
  type: string;
  errorMessage?: string;
  getValidation?: (value: string) => void;
  menuItems?: [{ menuValue: string; menuName: string }];
  textFieldType?: string;
  fullWidth?: boolean;
  label?: string;
  margin?: any;
  name?: string;
  onChange?: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => void | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  variant?: any;
}

interface ButtonProp {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  loading?: boolean;
}

interface AuthFormProps {
  fields: Array<FieldProp>;
  buttons: Array<ButtonProp>;
  responseError: string;
  title: string;
  heading: string;
  subHeading: string;
  footerText: string;
  footerButton: {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };
}

const getFields = (field: FieldProp) => {
  switch (field.type) {
    case TEXT_FIELD: {
      const {
        fullWidth,
        label,
        margin,
        name,
        onBlur,
        // onChange,
        textFieldType,
        value,
        variant,
      } = field;

      return (
        <TextField
          fullWidth={fullWidth}
          label={label}
          margin={margin}
          name={name}
          onBlur={onBlur}
          //   onChange={onChange}
          type={textFieldType}
          value={value}
          variant={variant}
        />
      );
    }

    case SELECT: {
      const {
        label,
        value,
        //  onChange,
        menuItems,
      } = field;

      return (
        <FormControl margin="normal" fullWidth>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${label}-select-label-id`}
            id={`${label}-select`}
            value={value}
            label={label}
            // onChange={onChange}
          >
            {menuItems &&
              menuItems?.map(({ menuValue, menuName }) => (
                <MenuItem value={menuValue}>{menuName}</MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    }

    default:
      return null;
  }
};

const AuthForm = ({
  fields,
  buttons,
  responseError,
  heading,
  title,
  subHeading,
  footerText,
  footerButton,
}: AuthFormProps) => {
  const [fieldsData, setFieldsData] = useState(fields);

  useEffect(() => {
    setFieldsData(fields);
  }, [fields]);

  return (
    <>
      <Head>
        <title>{title}</title>
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
          <>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                {heading}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {subHeading}
              </Typography>
            </Box>
            {fieldsData?.map(getFields)}
            <Box sx={{ py: 2 }}>
              {buttons?.map(
                ({ onClick, name, color, loading, disabled, variant }) => (
                  <LoadingButton
                    variant={variant}
                    onClick={onClick}
                    color={color}
                    loading={loading}
                    disabled={disabled}
                  >
                    {name}
                  </LoadingButton>
                )
              )}
            </Box>
            <Typography color="textSecondary" variant="body2">
              {footerText}
              <Button onClick={footerButton.onClick}>
                {footerButton.text}
              </Button>
            </Typography>
          </>
        </Container>
        {responseError && <span style={{ color: 'red' }}>{responseError}</span>}
      </Box>
    </>
  );
};

export default AuthForm;
