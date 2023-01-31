/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Router from 'next/router';
import CommonTable, { transformObject } from '../../common/CommonTable';

// eslint-disable-next-line react/prop-types
const BatchListResults = ({
  batches,
  batchRoute,
  refetch,
}: {
  batches: any;
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
      'Pharma Sold',
      'Pharma Stock',
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
        text: 'Reached Pharmacy(s)',
        action: async (index: number) => {
          if (
            batches[index].status.toLowerCase() === 'shipped to pharmacy(s)'
          ) {
            await fetch('/api/batch', {
              method: 'PUT',
              body: JSON.stringify({
                status: 'Reached Pharmacy(s)',
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
