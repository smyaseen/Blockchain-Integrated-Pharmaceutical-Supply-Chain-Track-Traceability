import React from 'react';

import Router from 'next/router';
import { Batch } from '../_data_';
import CommonTable, { transformObject } from '../../common/CommonTable';

// eslint-disable-next-line react/prop-types
const BatchListResults = ({
  batches,
  batchRoute,
}: {
  batches: Array<Batch>;
  batchRoute: string;
}) => (
  <CommonTable
    columns={[
      'Id',
      'Medicine',
      'Distributor',
      'Quantity',
      'Expiry',
      'MFG',
      'Created',
      'Batch',
    ]}
    rows={transformObject(batches, [
      {
        text: 'Batch Progress',
        action: () => {
          Router.push(batchRoute);
        },
      },
    ])}
  />
);

export default BatchListResults;
