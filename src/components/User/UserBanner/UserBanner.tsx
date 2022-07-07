import { useUser } from '@auth0/nextjs-auth0';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IconFemale } from '@douyinfe/semi-icons';
import { Avatar } from '@douyinfe/semi-ui';
import { useState } from 'react';

import UserAvatarModal from '@/components/User/UserBanner/UserAvatarModal';

import styles from '../styles/userBanner.module.css';

const UserBanner = (props: any) => {
  const { user } = useUser();
  const { userId } = props;
  const [intro, setIntro] = useState('Say something ...');
  const [avatarDialogVisible, setAvatarDialogVisible] = useState(false);

  const showAvatarDialog = () => {
    setAvatarDialogVisible(true);
  };

  const handleIntro = (e: any) => {
    setIntro(e.target.value);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url('/assets/images/default_user_background.jpg')`,
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.userProfileBar}>
          {/* User Avatar Section Started */}
          <div className={styles.userAvatarBox}>
            <Avatar
              onClick={() => showAvatarDialog()}
              className={styles.userAvatarImage}
              alt={`avatar for user ${user?.email}`}
              src={`${user?.picture}`}
            />
          </div>

          {/* User Profile Info Started */}
          <div className={styles.userProfileBox}>
            <div className={styles.userProfileContent}>
              <strong>{user?.nickname}</strong>
              <span className={styles.userGender}>
                <IconFemale />
              </span>
              <span className={styles.userId}>ID: {userId}</span>
              <span className={styles.userRegisterDate}>27 Days</span>
            </div>
            <div className={styles.userProfileIntro}>
              <input onChange={(e) => handleIntro(e)} value={intro} />
            </div>
          </div>

          {/* User Follower & Following Section Started */}
          <div className={styles.userFollowsContainer}>
            <div className={styles.userFollowsWrapper}>
              <div className={styles.userFollowers}>
                <span className={styles.userFollowsLabel}>Followers</span>
                <strong className={styles.userFollowsText}>5,000</strong>
              </div>
              <div className={styles.userFollowing}>
                <span className={styles.userFollowsLabel}>Following</span>
                <strong className={styles.userFollowsText}>26</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserAvatarModal
        avatarDialogVisible={avatarDialogVisible}
        setAvatarDialogVisible={setAvatarDialogVisible}
      />
    </div>
  );
};

export default UserBanner;
