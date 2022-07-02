import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

import AppLayout from '../components/layout/AppLayout';
import AuthProvider from '../context/authContext/AuthProvider';
import { createTheme, ThemeProvider } from '@mui/material';

const customTheme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <AppLayout>
                <ThemeProvider theme={customTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppLayout>
        </AuthProvider>
    );
}

export default MyApp;
