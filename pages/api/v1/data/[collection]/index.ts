import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'backend/mongoDB/mongoDB';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();

  const { collection } = req.query;
  const sort = req.query.sort ? req.query.sort : 'number';

  const data = await db.collection(collection).find({}).sort(sort).toArray();

  res.status(200).json(data);
}
