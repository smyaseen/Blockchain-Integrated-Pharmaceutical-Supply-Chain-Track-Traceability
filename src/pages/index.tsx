/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { AppRegistration, Wallet } from '@mui/icons-material';
import { useConnect, useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { signIn, useSession } from 'next-auth/react';
import { ethers } from 'ethers';
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

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connectedProvider = provider.getSigner(address).provider;

  const contract = new ethers.Contract(
    ACCESS_CONTROL_CONTRACT_ADDRESS,
    AccessControl,
    connectedProvider
  );

  const handleLogin = async () => {
    try {
      connect({ connector: connectors[0] });
    } catch (_error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    if (address && isConnected && status !== 'authenticated') {
      contract
        .connect(provider.getSigner(address))
        .getRole()
        .then(({ name, role }: { name: string; role: string }) => {
          signIn('credentials', {
            address,
            name,
            role: rolesToByte32[role],
          });
        });
    }
  }, [address]);

  useEffect(() => {
    setIsMetamaskAvailable(window.ethereum !== undefined);
  }, []);

  const {
    isLoading,
    data: batches,
    isFetching,
    refetch,
  } = useQuery(
    'batches',
    async () => {
      try {
        if (!batchId) return false;

        const stream = await fetch(`/api/batch?batchId=${batchId}`);
        const res = await stream.json();

        return res;
      } catch (_error) {
        return [];
      }
    },
    { staleTime: Infinity }
  );

  useEffect(() => {
    refetch();
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
                  // disabled={!getRoleFetched}
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
              <Button
                endIcon={<AppRegistration />}
                onClick={() => Router.push(RouteNames.signup)}
              >
                Sign Up
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Container sx={{ mt: 1 }} maxWidth="lg">
        {status !== 'authenticated' && (
          <>
            <Typography variant="h1" align="left">
              <Typography variant="h1" component="span" color="primary">
                The Future of Pharma <Divider />
              </Typography>
              Track and Traceability: <Divider /> A Blockchain-Based Solution
            </Typography>
            <Typography variant="h6" maxWidth="sm">
              Revolutionizing the Pharma Industry&apos;s Supply Chain Management
              with Blockchain Technology to Ensure Transparency, Accountability,
              and Efficiency in the Track and Traceability of Medicines.
            </Typography>
          </>
        )}

        <Box mt={3} justifyContent="center">
          <TrackBatch
            setBatchId={(id: string) => {
              setBatchId(id);
            }}
          />
        </Box>

        {isLoading || isFetching ? (
          <Box mt={3}>
            <CircularProgress />
          </Box>
        ) : batches ? (
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
        ) : (
          (batches === null || batches?.length === 0) && (
            <Typography variant="subtitle1" maxWidth="sm" mt={2}>
              We&apos;re sorry, the batch number you entered could not be found
              in our system. Please check the number and try again.
            </Typography>
          )
        )}
      </Container>
    </>
  );
};

export default Home;
