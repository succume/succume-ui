import { getSession } from '@auth0/nextjs-auth0';
import { Button } from '@douyinfe/semi-ui';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import Link from 'next/link';

import Page from '@/components/_common/Page';
import { useStore } from '@/store';

/**
 * The interface for user metadata.
 */
interface Metadata {
  id?: string;
  name?: string;
  follow?: number;
  follower?: number;
  post?: number;
  signature?: string;
  user_id?: string;
}

/**
 * The interface for Page props.
 */
interface Props {
  metadata: Metadata;
}

/**
 * The Next.js page component for user profile.
 * @param metadata the required user profile from Auth0 service.
 * @constructor
 */
const UserPage: NextPage<Props> = ({ metadata }) => {
  const store = useStore();

  // eslint-disable-next-line no-console
  console.log(metadata);

  return (
    <Page>
      <p>Profile Page</p>
      {/* <span>{store.user.userInfo.name}</span> */}
      <span>{store.user.userInfo.email}</span>
      <Link href="/">
        <a>
          <Button>Back to Home</Button>
        </a>
      </Link>
    </Page>
  );
};

/**
 * The lifecycle method for user profile page to fetch required data before rendering.
 */
UserPage.getInitialProps = async ({ req, res }) => {
  let data: Props = {
    metadata: {},
  };

  let options: AxiosRequestConfig<any> = {
    method: 'GET',
    url: `http://localhost/api/auth/metadata`,
  };

  if (req) {
    // @ts-ignore
    const session = getSession(req, res);

    const id = session?.user?.sub;
    const accessToken = session?.accessToken;
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}`;

    options = {
      method: 'GET',
      url,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
    };
  }

  await axios.request(options).then((axiosRes) => {
    data = {
      // metadata: axiosRes?.data?.user_metadata,
      metadata: axiosRes?.data,
    };
  });

  return data;
};

export default observer(UserPage);

// export const getServerSideProps = withPageAuthRequired({});
