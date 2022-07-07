import { useUser } from '@auth0/nextjs-auth0';

import UserBanner from '@/components/User/UserBanner/UserBanner';
import UserMenu from '@/components/User/UserMenu';

export default function UserHeader() {
  const { user } = useUser();

  if (user) {
    return (
      <>
        <UserBanner userId={user?.sub?.split('|')[1]} />
        <UserMenu />
      </>
    );
  }

  return <></>;
}
