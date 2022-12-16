/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { SELECT, TEXT_FIELD } from './FieldTypes';
import { AuthFormProps, FieldProp } from './AuthTypes';

const getFields = (field: FieldProp, index: number) => {
  switch (field.type) {
    case TEXT_FIELD: {
      const {
        fullWidth,
        label,
        margin,
        name,
        onBlur,
        onChange,
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
          onChange={(e) => onChange(e, index)}
          type={textFieldType}
          value={value}
          variant={variant}
        />
      );
    }

    case SELECT: {
      const { label, value, onChange, menuItems } = field;

      return (
        <FormControl margin="normal" fullWidth>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${label}-select-label-id`}
            id={`${label}-select`}
            value={value}
            label={label}
            onChange={onChange}
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
            {fieldsData?.map((field, index) => (
              <>
                {getFields(field, index)}
                <span style={{ color: 'red' }}>{field.errorMessage}</span>
              </>
            ))}
            <Box sx={{ py: 2 }}>
              {buttons?.map(
                ({
                  onClick,
                  name,
                  color,
                  loading,
                  disabled,
                  variant,
                  fullWidth,
                  size,
                }) => (
                  <LoadingButton
                    variant={variant}
                    onClick={onClick}
                    color={color}
                    loading={loading}
                    disabled={disabled}
                    fullWidth={fullWidth}
                    size={size}
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
