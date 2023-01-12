/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, Fade, Grow } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
// import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType, NextPageContext } from 'next';

import createEmotionCache from '../utility/createEmotionCache';

import '../styles/globals.css';

import { store } from '../store/store';

import theme from '../theme';
import Layout from '../routes/Layout';

interface MyAppProps extends AppProps {
  // eslint-disable-next-line react/require-default-props
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

// const Layout = dynamic(() => import('../routes/Layout'), { ssr: false });

const getChildrenWithAnimation = (
  Component: NextComponentType<NextPageContext, any, any>,
  pageProps: any
) =>
  React.createElement(() => (
    <Fade in timeout={500}>
      <div>
        <Component {...pageProps} />
      </div>
    </Fade>
  ));

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Provider store={store}>
              <Layout>{getChildrenWithAnimation(Component, pageProps)}</Layout>
            </Provider>
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
