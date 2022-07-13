export type UserInfo = {
  email?: string | null | undefined;
  email_verified?: boolean | null | undefined;
  name?: string | null | undefined;
  nickname?: string | null | undefined;
  picture?: string | null | undefined;
  sub?: string | null | undefined;
  updated_at?: string | null | undefined;
};

export type User = {
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  birthday?: string;
  post?: number;
  follow?: number;
  follower?: number;
  signature?: string;
  picture?: string;
};

export interface UserStore {
  userInfo: User;
  setUserInfo: (value: User) => void;
}

const userStore = (): UserStore => {
  return {
    userInfo: {
      user_id: '',
      email: '',
      first_name: '',
      last_name: '',
      gender: '',
      birthday: '',
      post: 0,
      follow: 0,
      follower: 0,
      signature: '',
      picture: '',
    },
    setUserInfo(value) {
      this.userInfo = value;
    },
  };
};

export default userStore;
