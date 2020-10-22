import { FC } from 'react';
import Layout from '../components/layout';
import styles from './styles.module.scss';
import Home from '../components/Home';

export const Main: FC = () => {

  return (
    <Layout home title={'Rob Taussig'} className={styles.root}>
      <Home/>
    </Layout>
  )
}

export default Main;
