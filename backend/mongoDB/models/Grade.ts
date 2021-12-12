import mongoose from 'mongoose';

export interface GradeProps {
  grade: string;
}

const GradeSchema = new mongoose.Schema<GradeProps>(
  {
    grade: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.models.Grade ||
  mongoose.model('Grade', GradeSchema, 'grades');
