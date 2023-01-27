/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from 'react';
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
  Grid,
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
        disabled,
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
          disabled={disabled}
        />
      );
    }

    case SELECT: {
      const { label, value, onChange, menuItems, disabled } = field;

      return (
        <FormControl margin="normal" fullWidth>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${label}-select-label-id`}
            id={`${label}-select`}
            value={value}
            label={label}
            disabled={disabled}
            onChange={(e) => onChange(e, index)}
          >
            {menuItems &&
              menuItems?.map(({ menuValue, menuName }) => (
                <MenuItem key={menuValue} value={menuValue}>
                  {menuName}
                </MenuItem>
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
  footerButtons,
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
              <Fragment key={field.label}>
                {getFields(field, index)}
                <span style={{ color: 'red' }}>{field.errorMessage}</span>
              </Fragment>
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
                    key={name}
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
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              {footerButtons.map(({ text, btnText, onClick }) => (
                <Grid key={text} item>
                  <Typography color="textSecondary" variant="body2">
                    {text}
                  </Typography>
                  <Button onClick={onClick}>{btnText}</Button>
                </Grid>
              ))}
            </Grid>
            {responseError && (
              <span style={{ color: 'red' }}>{responseError}</span>
            )}
          </>
        </Container>
      </Box>
    </>
  );
};

export default AuthForm;
