import { Button, Form } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { useStore } from '@/store';

import styles from './styles/ProfileStep.module.scss';

interface Props {
  nextStep: () => void;
}

const ProfileStep: FC<Props> = ({ nextStep }) => {
  const store = useStore();
  const [firstName, setFirstName] = useState<string>(
    store.user.userInfo.first_name || ''
  );
  const [lastName, setLastName] = useState<string>(
    store.user.userInfo.last_name || ''
  );
  const [email, setEmail] = useState<string>(store.user.userInfo.email || '');
  const [gender, setGender] = useState<string>(
    store.user.userInfo.gender || ''
  );
  const [birthday, setBirthday] = useState<string>(
    store.user.userInfo.birthday || ''
  );
  const [done, setDone] = useState<boolean>(false);

  const checkIsDone = (): boolean => {
    const res = false;
    if (firstName.length === 0) return res;
    if (lastName.length === 0) return res;
    if (email.length === 0) return res;
    if (gender.length === 0) return res;
    if (birthday.length === 0) return res;
    return true;
  };

  const handleNextPage = (): void => {
    store.user.setUserInfo({
      ...store.user.userInfo,
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      birthday,
    });
    nextStep();
  };

  useEffect(() => {
    setDone(checkIsDone);
  }, [firstName, lastName, email, gender, birthday]);

  const handleFirstName = (filedValue: any | { target: { value: any } }) => {
    setFirstName(filedValue);
  };

  const handleLastName = (filedValue: any | { target: { value: any } }) => {
    setLastName(filedValue);
  };

  const handleEmail = (filedValue: any | { target: { value: any } }) => {
    setEmail(filedValue);
  };

  const handleGender = (filedValue: any | { target: { value: any } }) => {
    setGender(filedValue);
  };

  const handleBirthday = (filedValue: any | { target: { value: any } }) => {
    setBirthday(moment(filedValue).format('YYYY-MM-DD'));
  };

  return (
    <div className={styles.profile_step_container}>
      <div className={styles.profile_step_wrapper}>
        <Form labelPosition="inset" layout="horizontal">
          <div className={styles.profile_step_form}>
            <Form.Input
              field="first_name"
              label="名"
              trigger="blur"
              placeholder="First Name"
              onChange={handleFirstName}
              initValue={firstName}
              rules={[{ required: true, message: 'First Name is required' }]}
            />

            <Form.Input
              className={styles.profile_step_input}
              field="last_name"
              label="姓"
              trigger="blur"
              placeholder="Last Name"
              initValue={lastName}
              onChange={handleLastName}
              rules={[{ required: true, message: 'Last Name is required' }]}
            />

            <Form.Input
              className={styles.profile_step_input}
              field="email"
              label="邮箱"
              trigger="blur"
              placeholder="Email Address"
              onChange={handleEmail}
              initValue={email}
              rules={[{ required: true, message: 'Email Address is required' }]}
            />

            <Form.Select
              className={styles.profile_step_input}
              placeholder="Gender"
              field="性别"
              initValue={gender}
              onChange={handleGender}
            >
              <Form.Select.Option value="female">女</Form.Select.Option>
              <Form.Select.Option value="male">男</Form.Select.Option>
              <Form.Select.Option value="unknown">未知</Form.Select.Option>
            </Form.Select>

            <Form.DatePicker
              onChange={handleBirthday}
              className={styles.profile_step_input}
              field="YYYY-MM-DD"
              label="生日"
              placeholder="Birthday"
              initValue={birthday}
            />
          </div>
        </Form>
        <div className={styles.new_user_steps_controllers}>
          <Button
            className={styles.nextBtn}
            type="primary"
            onClick={() => handleNextPage()}
            disabled={!done}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfileStep);
