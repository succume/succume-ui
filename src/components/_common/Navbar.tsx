import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Avatar, Button, Col, Row } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import type { FC } from 'React';
import { useEffect, useState } from 'react';

import NewUserSteps from '@/components/_common/NewUserSteps';
import { useStore } from '@/store';
import type { UserInfo } from '@/store/userStore';
import checkNewUser from '@/utils/checkNewUser';

import styles from './styles/Navbar.module.scss';

interface Props {
  user?: UserInfo;
}

const UserAvatar: FC<Props> = withPageAuthRequired(({ user }) => {
  const [showNewUserSteps, setShowNewUserSteps] = useState<boolean>(false);

  useEffect(() => {
    checkNewUser().then((flag) => {
      setShowNewUserSteps(flag);
    });
  }, []);

  return (
    <>
      <div className={styles.navbar_user_avatar}>
        <Avatar
          alt={`user avatar for ${user?.email}`}
          src={`${user?.picture}`}
        />
      </div>
      {showNewUserSteps && <NewUserSteps />}
      {/* <NewUserSteps /> */}
    </>
  );
});

const Navbar: FC<any> = () => {
  const { user } = useUser();
  const store = useStore();

  // useEffect(() => {
  //   if (user) {
  //     store.user.setUserInfo(user);
  //   }
  // }, [user]);

  const displayUserAvatar = () => {
    if (user) {
      return <UserAvatar user={store.user.userInfo} />;
    }
    return (
      <Link href="/api/auth/login">
        <a>
          <Button
            className={styles.navbar_user_auth_login_btn}
            theme="solid"
            type="secondary"
          >
            Login
          </Button>
        </a>
      </Link>
    );
  };

  return (
    <div className={styles.navbar_container}>
      <div className={`grid ${styles.navbar_wrapper}`}>
        <Row>
          <Col xs={{ span: 5 }}>
            <div className={styles.navbar_logo_container}>
              <h1>Succume</h1>
            </div>
          </Col>
          <Col xs={{ span: 19 }} className={styles.navbar_menu_col}>
            <div className={styles.navbar_menu_section}>
              {displayUserAvatar()}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default observer(Navbar);
