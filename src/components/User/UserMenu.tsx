// eslint-disable-next-line import/no-extraneous-dependencies
import {
  IconEyeClosed,
  IconHome,
  IconKanban,
  IconPulse,
  IconUserSetting,
} from '@douyinfe/semi-icons';
import { TabPane, Tabs } from '@douyinfe/semi-ui';
import Link from 'next/link';

import styles from './styles/userMenu.module.css';

const menuList = [
  {
    title: 'Home',
    icon: <IconHome />,
    content: 'My Home Page',
  },
  {
    title: 'Posts',
    icon: <IconKanban />,
    content: 'My Posts',
  },
  {
    title: 'Events',
    icon: <IconPulse />,
    content: 'My events',
  },
  {
    title: 'Profile',
    icon: <IconUserSetting />,
    content: 'My profile',
  },
  {
    title: 'Privacy',
    icon: <IconEyeClosed />,
    content: (
      <Link href="/api/auth/logout">
        <a>Logout</a>
      </Link>
    ),
  },
];

export default function UserMenu() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Tabs className="user-page-menu">
          {menuList.map((menu, index) => (
            <TabPane
              key={`tab-${index}`}
              tab={
                <span>
                  {menu.icon}
                  {menu.title}
                </span>
              }
              // @ts-ignore
              itemKey={index}
            >
              {menu.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
