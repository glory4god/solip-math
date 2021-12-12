import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import ScoreManagement from 'backend/mongoDB/models/ScoreManagement';
import User from 'backend/mongoDB/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await User.findOne({ _id: id });

    ScoreManagement.find({ studentName: user.name })
      .sort({ createdDate: -1 })
      .then((management: any) => {
        if (management) {
          return res.status(200).json(management);
        } else {
          return res.status(400).json({ status: 400, message: 'get failed' });
        }
      });
  }
}
