import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from '../components/common/Head';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';
import Layout from '../components/common/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
