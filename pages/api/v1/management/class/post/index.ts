import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import ClassManagement from 'backend/mongoDB/models/ClassManagement';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { grade } = req.query;

  if (req.method === 'GET') {
    ClassManagement.find({ grade: grade })
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
    var classManagement = new ClassManagement(postManagement);

    classManagement.createdDate = new Date();

    classManagement.save((err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'save failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'save success' });
      }
    });
  }
}
