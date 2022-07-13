import { Button } from '@douyinfe/semi-ui';
import type { FC } from 'react';
import React from 'react';

import { useStore } from '@/store';

import styles from './styles/TermStep.module.scss';

interface Props {
  prevStep: () => void;
}

const TermStep: FC<Props> = ({ prevStep }) => {
  const store = useStore();
  const handleDone = () => {
    console.log(Object.keys(store.user.userInfo));
  };

  return (
    <div className={styles.term_container}>
      <div className={styles.term_wrapper}>
        <div className={styles.new_user_steps_controllers}>
          <Button className={styles.prevBtn} onClick={() => prevStep()}>
            Previous
          </Button>

          <Button
            className={styles.finishBtn}
            type="primary"
            onClick={() => handleDone()}
          >
            Start Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermStep;
