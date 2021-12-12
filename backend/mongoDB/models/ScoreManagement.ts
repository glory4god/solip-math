import mongoose from 'mongoose';

export interface ScoreManagementProps {
  studentName: string;
  date: string;
  testName: string;
  score: string;
  comment: string;
}
const ScoreManagementSchema = new mongoose.Schema<ScoreManagementProps>(
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
  },
  {
    versionKey: false,
  },
);

export default mongoose.models.ScoreManagement ||
  mongoose.model('ScoreManagement', ScoreManagementSchema, 'scoreManagements');
