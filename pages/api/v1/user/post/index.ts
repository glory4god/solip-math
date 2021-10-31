import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDB/models/User';

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
  if (req.method === 'POST') {
    // if (typeof req.body === Post) {
    User.findOne({ name: edit.name }, (err: any, user: any) => {
      if (user) {
        return res
          .status(400)
          .json({ status: 400, message: '이미 존재하는 학생입니다' });
      } else {
        var user = new User(edit);
        user.createDate = new Date();
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
    // } else {
    //   return res.status(400).json({ status: 400, message: 'not jsontype' });
    // }
  }
}
