import { hash, compare } from 'bcryptjs';
import { FieldProp } from '../components/auth/AuthForm/AuthTypes';

const encryptPassword = async (password: string): Promise<string> =>
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

export default encryptPassword;
