/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useSession } from 'next-auth/react';

import { useQuery } from 'react-query';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import {
  fetchUsers,
  fetchBatchIdsForDistributor,
  ACCESS_CONTROL_CONTRACT_ADDRESS,
} from '../../../utility/utils';
import AccessControl from '../../../contracts/AccessControl.json';
import { bytes32Roles, RoleTypes } from '../../../utility/roles';

const initialValue = {
  batchId: '',
  remaining: 0,
  quantity: 0,
  pharmacy: { name: '', address: ethers.constants.AddressZero },
  tokenId: 0,
  index: 0,
};

const CreateBatch = () => {
  const [values, setValues] = useState<{
    batchId: string;
    remaining: number;
    quantity: number;
    pharmacy: { name: string; address: string };
    tokenId: number;
    index: number;
  }>(initialValue);

  const [saving, setSaving] = useState(false);
  const { data } = useSession() as any;
  const [tokenId, setTokenId] = useState(0);

  const {
    data: batchIds,
    isFetching: fetchingBatchIds,
    refetch: refetchBatchIds,
  } = useQuery('batchIds', async () => fetchBatchIdsForDistributor(data.name), {
    staleTime: Infinity,
    retryOnMount: true,
    onSuccess(
      ids: [
        { batchId: string; quantity: number; sold: number; tokenId: number }
      ]
    ) {
      ids.length &&
        setValues({
          ...values,
          batchId: ids[0].batchId,
          remaining: ids[0].quantity - ids[0].sold,
          quantity: ids[0].quantity,
          tokenId: ids[0].tokenId,
        });
    },
  });

  useEffect(() => {
    setTokenId(
      batchIds?.find((b) => b.batchId === values.batchId)?.tokenId || 0
    );
  }, [values.batchId]);

  const { data: pharmacies, isFetching: fetchingPharmacies } = useQuery(
    'pharmacies',
    async () => fetchUsers('pharmacy'),
    {
      staleTime: Infinity,
      onSuccess(pharms: { name: string; address: string }[]) {
        pharms.length &&
          setValues({
            ...values,
            pharmacy: pharms[0],
          });
      },
    }
  );

  const { config, isFetchedAfterMount, isFetching } = usePrepareContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: 'addPharmacy',
    args: [
      values.pharmacy.address,
      tokenId,
      bytes32Roles['distributor' as keyof RoleTypes],
    ],
  });

  const { writeAsync } = useContractWrite(config);

  const args2 = [
    tokenId,
    'Shipped to Pharmacy(s)',
    bytes32Roles['distributor' as keyof RoleTypes],
  ];

  const { config: config2 } = usePrepareContractWrite({
    address: ACCESS_CONTROL_CONTRACT_ADDRESS,
    abi: AccessControl,
    functionName: 'updateStatus',
    args: args2,
  });

  const { writeAsync: write2 } = useContractWrite(config2);

  const handleChange = (
    name: string,
    value: string | number,
    remaining?: number
  ) => {
    setValues({
      ...values,
      [name]:
        name === 'pharmacy'
          ? pharmacies?.[parseInt(value as string, 10)]
          : value,
      ...(name === 'pharmacy' ? { index: parseInt(value as string, 10) } : {}),
      ...(remaining ? { remaining } : {}),
    });
  };

  const saveOrder = async () => {
    setSaving(true);

    const { batchId, quantity, pharmacy } = values;
    if (batchId && quantity && pharmacy) {
      try {
        await fetch('/api/order', {
          method: 'POST',
          body: JSON.stringify({
            batchId,
            quantity,
            pharmacy: pharmacy.name.replaceAll('-', ' '),
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const { hash } = await write2?.();

        const transactions = batchIds?.find(
          (b) => b.batchId === batchId
        ).transactions;

        await fetch('/api/batch', {
          method: 'PUT',
          body: JSON.stringify({
            status: 'Shipped to Pharmacy(s)',
            transactions: [...transactions, hash],
            batchId,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        refetchBatchIds();

        await writeAsync?.();
      } catch (err) {
        //
      }
    }
    setSaving(false);
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <>
          <CardHeader
            subheader="Create Order from Batches"
            title="Create Order"
          />
          <Divider />
          {fetchingPharmacies ||
          fetchingBatchIds ||
          !isFetchedAfterMount ||
          isFetching ||
          saving ? (
            <Box
              sx={{
                display: 'flex',
              }}
              justifyContent="center"
              mt={2}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select Batch Id"
                      name="batchId"
                      onChange={({ target: { name, value } }) => {
                        const batch = batchIds?.find(
                          ({ batchId }) => batchId === value
                        );
                        handleChange(
                          name,
                          value,
                          !batch?.quantity && !batch?.sold
                            ? batch?.quantity
                            : batch.quantity - batch.sold
                        );
                      }}
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={values.batchId}
                    >
                      {batchIds?.map((option) => (
                        <option key={option.batchId} value={option.batchId}>
                          {option.batchId}
                        </option>
                      ))}
                    </TextField>
                    <Typography variant="h6">
                      Remaining: {values.remaining}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select Pharmacy"
                      name="pharmacy"
                      onChange={({ target: { name, value } }) => {
                        handleChange(name, value);
                      }}
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={values.pharmacy.index}
                    >
                      {pharmacies?.map(({ name }, index) => (
                        <option key={name.replaceAll(' ', '-')} value={index}>
                          {name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Quantity"
                      name="quantity"
                      onChange={({ target: { name, value } }) =>
                        handleChange(name, value)
                      }
                      required
                      variant="outlined"
                      value={values.quantity}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  disabled={
                    !batchIds?.length ||
                    !pharmacies?.length ||
                    values.quantity > values.remaining ||
                    !values.remaining ||
                    !values.quantity ||
                    !values.batchId ||
                    !values.pharmacy ||
                    isFetching ||
                    !isFetchedAfterMount ||
                    saving
                  }
                  onClick={async () => saveOrder()}
                >
                  Create Order
                </Button>
              </Box>
            </>
          )}
        </>
      </Card>
    </form>
  );
};

export default CreateBatch;
