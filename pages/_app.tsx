import "../styles/globals.css";
import type { AppProps } from "next/app";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "../src/user/AuthContext";
import { AlertProvider } from "../src/components/AlertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ErrorBoundary from "../src/components/ErrorBoundary";

import createEmotionCache from "../src/util/createEmotionCache";
import MUITheme from "../MUITheme";

const emotionCache = createEmotionCache();
const queryClient = new QueryClient();

import Layout from "../src/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<StyledEngineProvider injectFirst>
				<CacheProvider value={emotionCache}>
					<ThemeProvider theme={MUITheme}>
						<CssBaseline />
						<QueryClientProvider client={queryClient}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<AlertProvider>
									<AuthProvider>
										<Layout>
											<Head>
												<meta name='viewport' content='initial-scale=1, width=device-width' />
											</Head>
											<Component {...pageProps} />
										</Layout>
									</AuthProvider>
								</AlertProvider>
							</LocalizationProvider>
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryClientProvider>
					</ThemeProvider>
				</CacheProvider>
			</StyledEngineProvider>
		</ErrorBoundary>
	);
}

export default MyApp;
