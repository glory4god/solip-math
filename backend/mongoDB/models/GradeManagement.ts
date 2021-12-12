import mongoose from 'mongoose';

export interface GradeManagementProps {
  studentName: string;
  date: string;
  testName: string;
  score: string;
  comment: string;
  createdDate: Date;
}
const GradeManagementSchema = new mongoose.Schema<GradeManagementProps>(
  {
    studentName: {
      type: String,
      unique: false,
    },
    date: {
      type: String,
      unique: false,
    },
    testName: {
      type: String,
      unique: false,
    },
    score: {
      type: String,
      unique: false,
    },
    comment: {
      type: String,
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

export default mongoose.models.GradeManagement ||
  mongoose.model('GradeManagement', GradeManagementSchema, 'gradeManagements');
