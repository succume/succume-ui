import { Button } from '@douyinfe/semi-ui';
import Link from 'next/link';

import Page from '@/components/_common/Page';

const Index = () => {
  return (
    <Page>
      <p>Index Page</p>
      <Link href="/user">
        <a>
          <Button>User Profile</Button>
        </a>
      </Link>
    </Page>
  );
};

export default Index;
