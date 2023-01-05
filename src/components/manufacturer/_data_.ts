import { v4 as uuid } from 'uuid';

export interface Product {
  id: string;
  name: string;
}

const products: Array<Product> = [
  {
    id: uuid(),
    name: `PANADOL 500MG TAB 200'S`,
  },
  {
    id: uuid(),
    name: `Surbex-Z Tablets 30's`,
  },
  {
    id: uuid(),
    name: `Cac1000 Plus Tab-Orange T 20's`,
  },
  {
    id: uuid(),
    name: `Norvasc Tablets 5mg 30's`,
  },
  {
    id: uuid(),
    name: `Clindamax Gel 10 G`,
  },
  {
    id: uuid(),
    name: `Klaricid Tablets Xl 500mg 5's`,
  },
  {
    id: uuid(),
    name: `Lefora Tab 20 MG 30's`,
  },
  {
    id: uuid(),
    name: `Actim Tablets 10mg 14's`,
  },
  {
    id: uuid(),
    name: `Adicos Syrup 120ml`,
  },
  {
    id: uuid(),
    name: `Admore Drops`,
  },
];

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

export default products;
