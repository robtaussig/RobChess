import '../styles/global.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Layout from '../components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout home title={'Rob Taussig'}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
