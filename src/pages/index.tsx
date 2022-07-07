import { useUser } from '@auth0/nextjs-auth0';
import { Avatar } from '@douyinfe/semi-ui';
import Link from 'next/link';

import styles from '@/styles/index.module.css';

const UserAvatar = () => {
  const { user } = useUser();
  if (user) {
    return (
      <div className={styles.authUserAvatar}>
        <Avatar
          alt={`avatar for user ${user.name}`}
          // @ts-ignore
          src={user.picture}
        />
      </div>
    );
  }
  return (
    <Avatar
      alt="default user avatar"
      src="/assets/images/default_avatar.jpeg"
    />
  );
};

const Index = () => {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <Link href={`/user/${user?.sub?.split('|')[1]}`}>
        <a>
          <UserAvatar />
        </a>
      </Link>
    </div>
  );
};

export default Index;
