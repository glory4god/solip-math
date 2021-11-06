import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDB/models/User';
import WrongAnswer from 'lib/mongoDB/models/WrongAnswer';
import Management from 'lib/mongoDB/models/Management';

type Post = {
  name: string;
  grade: '중1' | '중2' | '중3' | '고1' | '고2' | '고3';
  gender: '남' | '여';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const edit = req.body;

  const { id } = req.query;

  if (req.method === 'POST') {
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
    User.findOneAndDelete({ _id: id }, (err: any, user: any) => {
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
    User.findByIdAndUpdate(id, { $set: { auth: false } }, (err) => {
      if (err) {
        return res.status(400).json({ status: 400, message: '수정 실패' });
      } else {
        return res.status(200).json({ status: 200, message: '수정 성공' });
      }
    });
  }
}
