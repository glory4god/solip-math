import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from '../components/common/Head';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';
import Layout from '../components/common/Layout';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
