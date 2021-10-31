import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import User from 'lib/mongoDB/models/User';

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
