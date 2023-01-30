/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Router from 'next/router';
import { Batch } from '../_data_';
import CommonTable, { transformObject } from '../../common/CommonTable';

// eslint-disable-next-line react/prop-types
const BatchListResults = ({
  batches,
  batchRoute,
  refetch,
}: {
  batches: Array<Batch>;
  batchRoute: string;
  refetch: any;
}) => (
  <CommonTable
    columns={[
      'Id',
      'Manufacturer',
      'Medicine',
      'Quantity',
      'Distributor',
      'Expiry',
      'MFG',
      'Status',
      'Sold',
      'Created',
      'Batch',
      'Change Status',
    ]}
    rows={transformObject(batches, [
      {
        text: 'Batch Progress',
        action: (index: number) => {
          Router.push(
            `http://127.0.0.1:8080?batchId=${batches[index].batchId}`
          );
        },
      },
      {
        text: 'Ship to Distributor',
        action: async (index: number) => {
          if (batches[index].status.toLowerCase() === 'manufactured') {
            await fetch('/api/batch', {
              method: 'PUT',
              body: JSON.stringify({
                status: 'Shipped To Distributor',
                batchId: batches[index].batchId,
              }),
              headers: { 'Content-Type': 'application/json' },
            });

            refetch();
          }
        },
      },
    ])}
  />
);

export default BatchListResults;
