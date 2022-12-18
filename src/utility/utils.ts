import { hash } from 'bcryptjs';

const encryptPassword = async (password: string): Promise<string> =>
  hash(password, 12);

export default encryptPassword;
