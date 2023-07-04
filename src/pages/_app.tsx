/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, Fade } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { publicProvider } from 'wagmi/providers/public';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { hardhat, sepolia } from '@wagmi/core/chains';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

import createEmotionCache from '../utility/createEmotionCache';

import '../styles/globals.css';

import theme from '../theme';
// import Layout from '../routes/Layout';

import useNProgress from '../components/nprogress/use-nprogress';

interface MyAppProps extends AppProps {
  // eslint-disable-next-line react/require-default-props
  emotionCache?: EmotionCache;
}

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [
    // {
    //   ...hardhat,
    //   id: 1337,
    //   nativeCurrency: {
    //     ...hardhat.nativeCurrency,
    //     name: 'Hardhat',
    //     symbol: 'HardhatETH',
    //   },
    // },
    {
      ...sepolia,
      id: 11155111,
      nativeCurrency: {
        ...sepolia.nativeCurrency,
        name: 'Sepolia test network',
        symbol: 'SepoliaETH',
      },
    },
  ],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const clientSideEmotionCache = createEmotionCache();

const Layout = dynamic(() => import('../routes/Layout'), { ssr: false });

const FadeMUI = ({ children }: { children: any }) =>
  React.createElement(() => (
    <Fade in timeout={500}>
      {children}
    </Fade>
  ));

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  useNProgress();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <WagmiConfig client={client}>
            <SessionProvider>
              <Layout>
                <FadeMUI>
                  <div id="container" style={{ height: '100%' }}>
                    <Component {...pageProps} />
                  </div>
                </FadeMUI>
              </Layout>
            </SessionProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
