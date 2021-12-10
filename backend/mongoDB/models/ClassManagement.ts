import mongoose from 'mongoose';

export interface ClassManagementProps {
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

const ClassManagementSchema = new mongoose.Schema<ClassManagementProps>(
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
  mongoose.model('ClassManagement', ClassManagementSchema, 'classManagements');
