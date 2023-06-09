/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Router from 'next/router';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CircularProgress } from '@mui/material';
import { Batch } from '../_data_';
import CommonTable, { transformObject } from '../../common/CommonTable';
import AccessControl from '../../../contracts/AccessControl.json';
import { bytes32Roles, RoleTypes } from '../../../utility/roles';
import { ACCESS_CONTROL_CONTRACT_ADDRESS } from '../../../utility/utils';

// eslint-disable-next-line react/prop-types
const BatchListResults = ({
  batches,
  batchRoute,
  refetch,
}: {
  batches: Array<Batch>;
  batchRoute: string;
  refetch: any;
}) => {
  const args = [
    0,
    'Shipped To Warehouse',
    bytes32Roles['manufacturer' as keyof RoleTypes],
  ];

  const { config, isFetched, isFetchedAfterMount } = usePrepareContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: 'updateStatus',
    args,
  });

  const { writeAsync } = useContractWrite(config);

  return (
    <>
      {!isFetched || !isFetchedAfterMount || !writeAsync ? (
        <CircularProgress />
      ) : (
        <CommonTable
          columns={[
            'Id',
            'Manufacturer',
            'Medicine',
            'Quantity',
            'Distributor',
            'Batch Token Id',
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
                  `https://bisc.vercel.app?batchId=${batches[index].batchId}`
                );
              },
            },
            {
              text: 'Ship to Distributor',
              action: async (index: number) => {
                if (batches[index].status.toLowerCase() === 'manufactured') {
                  args[0] = batches[index].tokenId;

                  const { hash } = await writeAsync?.();

                  await fetch('/api/batch', {
                    method: 'PUT',
                    body: JSON.stringify({
                      status: 'Shipped To Distributor',
                      transactions: [...batches[index].transactions, hash],
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
      )}
    </>
  );
};

export default BatchListResults;
