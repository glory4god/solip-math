import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import Grade from 'backend/mongoDB/models/Grade';
import User from 'backend/mongoDB/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'POST') {
    const grade = new Grade({ grade: id });

    grade.save((err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'save failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'save success' });
      }
    });
  } else if (req.method === 'DELETE') {
    User.find({ grade: id }, (err: any, users: any) => {
      if (!err) {
        if (users.length !== 0) {
          return res.status(400).json({
            status: 400,
            message: 'delete failed / remain grade in users',
          });
        } else {
          Grade.findOneAndDelete({ grade: id }, (err: any, grade: any) => {
            if (err) {
              return res
                .status(400)
                .json({ status: 400, message: 'delete failed' });
            } else {
              return res
                .status(200)
                .json({ status: 200, message: 'delete success' });
            }
          });
        }
      } else {
        return res
          .status(400)
          .json({ status: 400, message: 'db server failed' });
      }
    });
  } else if (req.method === 'PATCH') {
    const { userId } = req.query;
    User.findByIdAndUpdate(
      userId,
      { $set: { grade: id } },
      (err: any, user: any) => {
        if (err) {
          return res
            .status(400)
            .json({ status: 400, message: 'update failed' });
        } else {
          return res
            .status(200)
            .json({ status: 200, message: 'update success' });
        }
      },
    );
  }
}
