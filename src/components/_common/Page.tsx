import { Layout } from '@douyinfe/semi-ui';
import type { FC, ReactNode } from 'react';

import Navbar from '@/components/_common/Navbar';

import styles from './styles/Page.module.scss';

const { Header, Content } = Layout;

interface Props {
  children?: ReactNode;
}

const Page: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </div>
  );
};

export default Page;
