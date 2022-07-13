import '../styles/app.global.scss';

import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';

import { StoreProvider } from '@/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <StoreProvider initialValue={{ user: {} }}>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </StoreProvider>
);

export default MyApp;
