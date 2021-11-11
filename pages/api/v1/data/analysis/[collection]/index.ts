import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'lib/mongoDB/mongoDB';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { db } = await connectToDatabase();

  const { collection } = req.query;
  const name = req.query.name;
  const book = req.query.book;
  const group = req.query.group;

  const data = await db
    .collection(collection)
    .aggregate([
      {
        $match: { name },
      },
      {
        $group: {
          _id: `$book`,
          numbers: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $project: {
          book: '$_id',
          numbers: 1,
          counts: 1,
        },
      },
      // {
      //   $group: {
      //     _id: `$numbers.number`,
      //     numbers: { $sum: 1 },
      //   },
      // },
      {
        $sort: {
          counts: -1,
        },
      },
    ])
    .toArray();

  res.status(200).json(data);
}
