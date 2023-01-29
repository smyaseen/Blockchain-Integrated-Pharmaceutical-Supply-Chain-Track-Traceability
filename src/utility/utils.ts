import { hash, compare } from 'bcryptjs';
import { FieldProp } from '../components/auth/AuthForm/AuthTypes';
import { Product } from '../components/manufacturer/_data_';

export const encryptPassword = async (password: string): Promise<string> =>
  hash(password, 12);

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isPasswordValid = await compare(password, hashedPassword);
  return isPasswordValid;
};

export const setFieldsDisabled = (
  disabled: boolean,
  fields: Array<FieldProp>
): Array<FieldProp> => fields.map((field) => ({ ...field, disabled }));

export const fetchProducts = async (
  manufacturer: string
): Promise<Product[]> => {
  try {
    const data = await fetch(`/api/products?manufacturer=${manufacturer}`);
    const res: Product[] = await data.json();

    return res;
  } catch (error) {
    return [];
  }
};

export const fetchDistributors = async (): Promise<string[]> => {
  try {
    const data = await fetch(`/api/distributors`);
    const res: string[] = await data.json();

    return res;
  } catch (error) {
    return [];
  }
};
