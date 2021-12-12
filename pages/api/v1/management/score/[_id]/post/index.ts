import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import ScoreManagement from 'backend/mongoDB/models/ScoreManagement';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { _id } = req.query;

  if (req.method === 'DELETE') {
    ScoreManagement.findByIdAndDelete(_id, (err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'delete failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'delete success' });
      }
    });
  }
}
