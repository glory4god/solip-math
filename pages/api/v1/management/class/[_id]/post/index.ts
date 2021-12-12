import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import ClassManagement from 'backend/mongoDB/models/ClassManagement';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { _id } = req.query;

  if (req.method === 'PATCH') {
    const postManagement = req.body;
    var management = new ClassManagement(postManagement);
    management.createdDate = new Date();

    ClassManagement.findByIdAndUpdate(
      _id,
      {
        $set: {
          author: postManagement.author,
          grade: postManagement.grade,
          content: postManagement.content,
        },
      },
      (err: any) => {
        if (err) {
          return res.status(400).json({ status: 400, message: 'save failed' });
        } else {
          return res.status(200).json({ status: 200, message: 'save success' });
        }
      },
    );
  } else if (req.method === 'DELETE') {
    ClassManagement.findByIdAndDelete(_id, (err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'delete failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'delete success' });
      }
    });
  }
}
