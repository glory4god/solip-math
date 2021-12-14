import mongoose, { Document } from 'mongoose';

export interface IClassManagement extends Document {
  author: string;
  grade: string;
  content: string;
  comment: Comment[];
  createdDate: Date;
}

type Comment = {
  author: string;
  content: string;
  createdDate: Date;
};

const ClassManagementSchema = new mongoose.Schema<IClassManagement>(
  {
    author: {
      type: String,
      unique: false,
    },
    grade: {
      type: String,
      unique: false,
    },
    content: {
      type: String,
      unique: false,
    },
    comment: {
      type: [],
      unique: false,
    },
    createdDate: {
      type: Date,
      unique: false,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.models.ClassManagement ||
  mongoose.model<IClassManagement>(
    'ClassManagement',
    ClassManagementSchema,
    'classManagements',
  );
