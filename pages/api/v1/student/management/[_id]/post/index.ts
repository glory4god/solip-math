import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'backend/mongoDB/dbConnect';
import Management from 'backend/mongoDB/models/Management';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { _id } = req.query;

  if (req.method === 'PATCH') {
    const postManagement = req.body;
    var management = new Management(postManagement);
    management.createdDate = new Date();

    Management.findByIdAndUpdate(
      _id,
      {
        $set: {
          author: postManagement.author,
          studentName: postManagement.studentName,
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
    Management.findByIdAndDelete(_id, (err: any) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'delete failed' });
      } else {
        return res.status(200).json({ status: 200, message: 'delete success' });
      }
    });
  }
}
