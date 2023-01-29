import { v4 as uuid } from 'uuid';

export interface Product {
  name: string;
}

export interface Batch {
  id: string;
  medicine: string;
  quantity: number;
  distributor: string;
  expiry: string;
  mfg: string;
  created: string;
}

export const batches: Array<Batch> = [
  {
    id: uuid(),
    medicine: `PANADOL 500MG TAB 200'S`,
    quantity: 100,
    distributor: 'IBL',
    expiry: new Date(new Date('12/23/2024')).toLocaleString().split(',')[0],
    mfg: new Date(Date.now()).toLocaleString().split(',')[0],
    created: new Date(Date.now()).toLocaleString().split(',')[0],
  },
  {
    id: uuid(),
    medicine: `Surbex-Z Tablets 30's`,
    quantity: 200,
    distributor: 'Getz',
    expiry: new Date(new Date('12/23/2024')).toLocaleString().split(',')[0],
    mfg: new Date(Date.now()).toLocaleString().split(',')[0],
    created: new Date(Date.now()).toLocaleString().split(',')[0],
  },
  {
    id: uuid(),
    medicine: `Cac1000 Plus Tab-Orange T 20's`,
    quantity: 300,
    distributor: 'IBL',
    expiry: new Date(new Date('12/23/2024')).toLocaleString().split(',')[0],
    mfg: new Date(Date.now()).toLocaleString().split(',')[0],
    created: new Date(Date.now()).toLocaleString().split(',')[0],
  },
];
