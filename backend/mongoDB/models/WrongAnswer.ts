import mongoose from 'mongoose';

export interface WrongAnswerProps {
  studentName: string;
  book: string;
  number: string;
  createdDate: Date;
}

const WrongAnswerSchema = new mongoose.Schema<WrongAnswerProps>(
  {
    studentName: {
      type: String,
      unique: false,
    },
    book: {
      type: String,
      unique: false,
    },
    number: {
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

export default mongoose.models.WrongAnswer ||
  mongoose.model('WrongAnswer', WrongAnswerSchema, 'wrongAnswers');
