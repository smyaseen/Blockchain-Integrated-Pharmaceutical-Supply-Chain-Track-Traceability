/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Product } from '../_data_';
import CommonTable, { transformObject } from '../../common/CommonTable';

const ProductListResults = ({
  products,
  deleteProduct,
}: {
  products: Product[];
  deleteProduct: (index: number) => void;
}) => (
  <CommonTable
    columns={['Id', 'Name', 'Actions']}
    rows={transformObject(products, [
      { text: 'Delete', action: deleteProduct },
    ])}
  />
);

export default ProductListResults;
