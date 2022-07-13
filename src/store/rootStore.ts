import type { UserStore } from './userStore';
import userStore from './userStore';

export interface IStore {
  user: UserStore;
}

export default function createStore(initialValue: any): () => IStore {
  return () => {
    return {
      user: { ...userStore(), ...initialValue?.user },
    };
  };
}
