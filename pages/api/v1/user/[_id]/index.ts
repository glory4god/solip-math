import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import User from 'backend/mongoDB/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const _id = req.query;

  User.findOne({ _id: _id }, (err: any, user: any) => {
    return res.status(200).json(user);
  });
}
