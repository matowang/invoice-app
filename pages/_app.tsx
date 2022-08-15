import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from '../src/user/AuthContext';

import ErrorBoundary from '../src/components/ErrorBoundary';

import createEmotionCache from '../src/util/createEmotionCache';
import MUITheme from '../MUITheme';

const emotionCache = createEmotionCache();

import Layout from '../src/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={MUITheme}>
            <CssBaseline />
            <AuthProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  )
}

export default MyApp
