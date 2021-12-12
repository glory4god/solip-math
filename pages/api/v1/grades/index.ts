import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import Grade from 'backend/mongoDB/models/Grade';
import User from 'backend/mongoDB/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  Grade.find()
    .sort({ grade: 1 })
    .then((grade: any) => {
      return res.status(200).json(grade);
    });
}
