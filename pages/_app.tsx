import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import createEmotionCache from '../src/components/util/createEmotionCache';
import MUITheme from '../MUITheme';

const emotionCache = createEmotionCache();

import Layout from '../src/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={MUITheme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
