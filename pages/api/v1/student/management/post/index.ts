import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import StudentManagement from 'backend/mongoDB/models/StudentManagement';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { studentName } = req.query;

  if (req.method === 'GET') {
    StudentManagement.find({ studentName: studentName })
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
    var management = new StudentManagement(postManagement);
    management.createdDate = new Date();

    management.save((err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'save failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'save success' });
      }
    });
  }
}
