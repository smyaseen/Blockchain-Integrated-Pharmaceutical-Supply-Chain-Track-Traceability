/* eslint-disable @typescript-eslint/no-explicit-any */
import { FocusEventHandler } from 'react';

export interface FieldProp {
  type: string;
  errorMessage?: string;
  getValidation?: (value: string) => string;
  menuItems?: [{ menuValue: string; menuName: string }];
  textFieldType?: string;
  fullWidth?: boolean;
  label?: string;
  margin?: any;
  name?: string;
  onChange?: any;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  variant?: any;
  values?: [string];
}

export interface ButtonProp {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  loading?: boolean;
}

export interface AuthFormProps {
  fields: Array<FieldProp>;
  buttons: ButtonProp[];
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
