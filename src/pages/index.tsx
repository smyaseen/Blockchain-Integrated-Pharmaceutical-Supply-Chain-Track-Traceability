import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Wallet } from '@mui/icons-material';
import { useConnect, useAccount, useContractRead } from 'wagmi';
import { useQuery } from 'react-query';
import { signIn, useSession } from 'next-auth/react';
import RouteNames from '../routes/RouteNames';
import TrackBatch from '../components/common/TrackBatch';
import BatchProgressComp from '../components/manufacturer/BatchProgress';
import SoldTransactionsTable from '../components/manufacturer/BatchProgress/SoldTransactionsTable';
import AccessControl from '../contracts/AccessControl.json';
import { rolesToByte32 } from '../utility/roles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;
const ACCESS_CONTROL_CONTRACT_ADDRESS =
  '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Home = () => {
  const { status } = useSession();

  const [isMetamaskAvailable, setIsMetamaskAvailable] =
    useState<boolean>(false);

  const [batchId, setBatchId] = useState(
    new URLSearchParams(window.location.search).get('batchId')
  );

  const { connect, connectors, error } = useConnect();
  const { address, isConnected } = useAccount();

  const handleLogin = async () => {
    try {
      connect({ connector: connectors[0] });
    } catch (_error) {
      window.alert(error);
    }
  };

  const { isFetchedAfterMount: getRoleFetched, data: getRoleData } =
    useContractRead({
      address: ACCESS_CONTROL_CONTRACT_ADDRESS,
      abi: AccessControl,
      functionName: 'getRole',
    });

  useEffect(() => {
    if (
      address &&
      getRoleFetched &&
      isConnected &&
      status !== 'authenticated'
    ) {
      signIn('credentials', {
        address,
        name: getRoleData.name,
        role: rolesToByte32[getRoleData.role],
      });
    }
  }, [address, getRoleFetched]);

  useEffect(() => {
    setIsMetamaskAvailable(window.ethereum !== undefined);
  }, []);

  const {
    isLoading,
    data: batches,
    // refetch,
  } = useQuery('batches', async () => {
    try {
      const stream = await fetch(`/api/batch?batchId=${batchId}`);
      const res = await stream.json();

      return res;
    } catch (_error) {
      return [];
    }
  });

  useEffect(() => {
    // refetch();
  }, [batchId]);

  return (
    <>
      <Head>
        <title>Track Batch</title>
      </Head>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography color="textPrimary" variant="h4">
            Track Your Batch
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {!isMetamaskAvailable && (
          <Typography color="primary">Install MetaMask!</Typography>
        )}

        {isMetamaskAvailable && !isConnected && status !== 'authenticated' && (
          <>
            <Grid item>
              <>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Have an account?
                </Typography>

                <Button
                  disabled={!getRoleFetched}
                  onClick={handleLogin}
                  endIcon={<Wallet />}
                >
                  Sign In with MetaMask
                </Button>
              </>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Don&apos;t have an account?
              </Typography>
              <Button onClick={() => Router.push(RouteNames.signup)}>
                Sign Up
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Container sx={{ mt: 1 }} maxWidth={false}>
        <TrackBatch
          setBatchId={(id: string) => {
            setBatchId(id);
          }}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          batches && (
            <>
              <Box margin="auto" mt={4} maxWidth={500}>
                <BatchProgressComp batches={batches} />
              </Box>
              {batches.pharmacy && (
                <Box m={3}>
                  <SoldTransactionsTable batches={batches} />
                </Box>
              )}
            </>
          )
        )}
      </Container>
    </>
  );
};

export default Home;
