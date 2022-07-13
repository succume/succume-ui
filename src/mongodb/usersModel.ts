import { model, models, Schema } from 'mongoose';

import type { User } from '@/store/userStore';

const usersSchema = new Schema<User>({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  post: {
    type: Number,
    required: true,
  },
  follow: {
    type: Number,
    required: true,
  },
  follower: {
    type: Number,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

const Users = models.Users || model<User>('Users', usersSchema);

export default Users;
