import { hash, compare } from 'bcryptjs';
import {
  DeliveryDiningRounded,
  FactoryRounded,
  LocalPharmacyRounded,
  LocalShippingRounded,
  ShoppingCartCheckoutRounded,
  SvgIconComponent,
  WarehouseRounded,
} from '@mui/icons-material';
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

export const fetchUsers = async (
  role: string
): Promise<{ name: string; address: string }[]> => {
  try {
    const data = await fetch(`/api/users?role=${role}`);
    const res: { name: string; address: string }[] = await data.json();

    return res;
  } catch (error) {
    return [];
  }
};

export const fetchBatchIdsForDistributor = async (
  role: string
): Promise<[] | [{ batchId: string; quantity: number; sold: number }]> => {
  try {
    const data = await fetch(`/api/batchId?distributor=${role}`);
    const res: [{ batchId: string; quantity: number; sold: number }] =
      await data.json();

    return res;
  } catch (error) {
    return Promise.resolve([]);
  }
};

export const fetchBatchIdsForPharmacy = async (
  role: string
): Promise<string[]> => {
  try {
    const data = await fetch(`/api/batchId?pharmacy=${role}`);
    const res: string[] = await data.json();

    return res;
  } catch (error) {
    return [];
  }
};

export const timelineNumber: { [key: string]: number } = {
  manufactured: 0,
  'Shipped To Distributor': 1,
  'Reached Warehouse': 2,
  'Shipped to Pharmacy(s)': 3,
  'Reached Pharmacy(s)': 4,
  'Sold To Customer(s)': 5,
};

export const timelineConfig: Array<{
  typography: string;
  Icon: SvgIconComponent;
}> = [
  {
    typography: 'manufactured',
    Icon: FactoryRounded,
  },
  {
    typography: 'Shipped To Warehouse',
    Icon: LocalShippingRounded,
  },
  {
    typography: 'Reached Warehouse',
    Icon: WarehouseRounded,
  },
  {
    typography: 'Shipped to Pharmacy(s)',
    Icon: DeliveryDiningRounded,
  },
  {
    typography: 'Reached Pharmacy(s)',
    Icon: LocalPharmacyRounded,
  },
  {
    typography: 'Sold To Customer(s)',
    Icon: ShoppingCartCheckoutRounded,
  },
];
