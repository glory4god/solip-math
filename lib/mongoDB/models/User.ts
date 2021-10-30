import mongoose from 'mongoose';

export interface UserProps {
  name: string;
  grade: string;
  gender: string;
  createDate: Date;
}

const UserSchema = new mongoose.Schema<UserProps>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    grade: {
      type: String,
      required: true,
      unique: false,
    },
    gender: {
      type: String,
      required: true,
      unique: false,
    },
    createDate: {
      type: Date,
      required: true,
      unique: false,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.models.User ||
  mongoose.model('User', UserSchema, 'users');
