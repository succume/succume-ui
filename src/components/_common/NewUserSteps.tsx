import { Steps } from '@douyinfe/semi-ui';
import type { FC } from 'react';
import { useState } from 'react';

import AvatarStep from '@/components/NewUserSteps/AvatarStep';
import ProfileStep from '@/components/NewUserSteps/ProfileStep';
import TermStep from '@/components/NewUserSteps/TermStep';

import styles from './styles/NewUserSteps.module.scss';

const NewUserSteps: FC<{}> = () => {
  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Profile',
      content: <ProfileStep nextStep={nextStep} />,
    },
    {
      title: 'Avatar',
      content: <AvatarStep nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: 'Terms',
      content: <TermStep prevStep={prevStep} />,
    },
  ];

  return (
    <div className={styles.new_user_steps_container}>
      <div className={styles.new_user_steps_wrapper}>
        <div className={styles.new_user_steps_title}>
          <Steps type="nav" size="small" current={current}>
            {steps.map((item, index) => (
              <Steps.Step title={item.title} key={index} />
            ))}
          </Steps>
        </div>
        <div className={styles.new_user_steps_body}>
          {steps[current]?.content}
        </div>
      </div>
    </div>
  );
};

export default NewUserSteps;
