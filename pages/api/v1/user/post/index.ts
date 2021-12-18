import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import User from 'backend/mongoDB/models/User';
import WrongAnswer from 'backend/mongoDB/models/WrongAnswer';
import Management from 'backend/mongoDB/models/StudentManagement';

interface User {
  name: string;
  grade: string;
  gender: '남' | '여' | '';
}

interface UserEdit {
  _id: string;
  name: string;
  auth: boolean;
  grade: string;
  gender: '남' | '여' | '';
  createdDate: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  if (req.method === 'POST') {
    const edit = req.body as User;

    User.findOne({ name: edit.name }, (err: any, user: any) => {
      if (user) {
        return res
          .status(400)
          .json({ status: 400, message: '이미 존재하는 학생입니다' });
      } else {
        var user = new User(edit);
        user.createdDate = new Date();
        user.auth = true;
        user.save((err: any) => {
          if (err) {
            return res
              .status(400)
              .json({ status: 400, message: 'save failed' });
          } else {
            return res
              .status(200)
              .json({ status: 200, message: 'save success' });
          }
        });
      }
    });
  } else if (req.method === 'DELETE') {
    const edit = req.body as UserEdit;

    User.findByIdAndDelete(edit._id, (err: any, user: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'delete failed' });
      } else {
        WrongAnswer.deleteMany({ name: user.name }, (err: any) => {
          if (err) {
            return res
              .status(400)
              .json({ status: 400, message: 'wrongAnswers delete failed' });
          } else {
            return res
              .status(200)
              .json({ status: 200, message: 'wrongAnswers delete success' });
          }
        });
        Management.deleteMany({ name: user.name }, (err: any) => {
          if (err) {
            return res
              .status(400)
              .json({ status: 400, message: 'management delete failed' });
          } else {
            return res
              .status(200)
              .json({ status: 200, message: 'management delete success' });
          }
        });
      }
    });
  } else if (req.method === 'PATCH') {
    const edit = req.body as UserEdit;

    let user = await User.findById(edit._id);
    user.name = edit.name;
    user.grade = edit.grade;
    user.auth = edit.auth;
    user.gender = edit.gender;
    await user.save();

    return res.status(200).json({ status: 200, message: 'user patch success' });
  }
}
