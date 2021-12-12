import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import GradeManagement from 'backend/mongoDB/models/GradeManagement';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { studentName } = req.query;

  if (req.method === 'GET') {
    GradeManagement.find({ studentName: studentName })
      .sort({ createdDate: -1 })
      .then((management: any) => {
        if (management) {
          return res.status(200).json(management);
        } else {
          return res.status(400).json({ status: 400, message: 'get failed' });
        }
      });
  } else if (req.method === 'POST') {
    const postManagement = req.body;
    console.log(postManagement);
    let management = new GradeManagement(postManagement);
    management.createdDate = new Date();
    console.log(management);
    management.save((err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'save failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'save success' });
      }
    });
  }
}
