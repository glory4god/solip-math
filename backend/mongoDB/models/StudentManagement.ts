import mongoose from 'mongoose';

export interface StudentManagementProps {
  author: string;
  studentName: string;
  content: string;
  comment: Comment[];
  createdDate: Date;
}

type Comment = {
  author: string;
  content: string;
  createdDate: Date;
};

const StudentManagementSchema = new mongoose.Schema<StudentManagementProps>(
  {
    author: {
      type: String,
      unique: false,
    },
    studentName: {
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

export default mongoose.models.StudentManagement ||
  mongoose.model(
    'StudentManagement',
    StudentManagementSchema,
    'studentManagements',
  );
