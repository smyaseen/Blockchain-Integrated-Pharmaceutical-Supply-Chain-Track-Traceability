import React from 'react';

import { Product } from '../_data_';
import CommonTable, { transformObject } from '../../common/CommonTable';

const ProductListResults = ({
  products,
}: // deleteProduct,
{
  products: Product[];
  // deleteProduct: (index: number) => void;
}) => (
  <CommonTable
    columns={[
      'Name',
      // , 'Actions'
    ]}
    rows={transformObject(
      products
      //   , [
      //   { text: 'Delete', color: 'error', action: deleteProduct },
      // ]
    )}
  />
);

export default ProductListResults;
