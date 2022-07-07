import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import UserHeader from '@/components/User/UserHeader';

const User = () => {
  const { isReady } = useRouter();

  if (isReady) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#F4F5F7',
        }}
      >
        <UserHeader />
      </div>
    );
  }

  return <></>;
};

export const getServerSideProps = withPageAuthRequired();

export default User;
