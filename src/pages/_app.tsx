import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
// import dynamic from 'next/dynamic';
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

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
