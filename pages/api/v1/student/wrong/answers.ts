import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from 'lib/mongoDB/dbConnect';
import WrongAnswer from 'lib/mongoDB/models/WrongAnswer';
import User from 'lib/mongoDB/models/User';

type WrongAnswerType = {
  name: string;
  book: string;
  number: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await User.findOne({ _id: id });

    WrongAnswer.aggregate(
      [
        { $match: { name: user.name } },
        { $sort: { number: 1 } },
        { $group: { _id: '$book', numbers: { $push: '$$ROOT' } } },
        {
          $project: {
            book: '$_id',
            _id: 0,
            numbers: { _id: 1, number: 1 },
          },
        },
        { $sort: { book: 1 } },
      ],
      (err: any, data: any) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(400).json({ status: 400, message: 'get failed' });
        }
      },
    );
  } else if (req.method === 'POST') {
    const wrong: WrongAnswerType = req.body;

    if (wrong.name === '') {
      return res.status(400).json({ status: 400, message: 'name is empty' });
    }
    if (wrong) {
      var answer = new WrongAnswer({
        name: wrong.name,
        book: wrong.book,
        number: wrong.number,
      });

      answer.createdDate = new Date();
      answer.save((err: any) => {
        if (err) {
          return res.status(400).json({ status: 400, message: 'saved failed' });
        } else {
          return res
            .status(200)
            .json({ status: 200, message: 'saved success' });
        }
      });
    }
  } else if (req.method === 'DELETE') {
    const { book } = req.query;

    if (!book) {
      WrongAnswer.findByIdAndRemove({ _id: id }, (err: any) => {
        if (err) {
          return res
            .status(400)
            .json({ status: 400, message: 'delete failed' });
        } else {
          return res
            .status(200)
            .json({ status: 200, message: 'delete success' });
        }
      });
    } else if (book) {
      const user = await User.findOne({ _id: id });

      WrongAnswer.deleteMany(
        { name: user.name, book: book },
        (err: any, data: any) => {
          if (err) {
            return res
              .status(400)
              .json({ status: 400, message: 'delete failed' });
          } else {
            return res

              .status(200)
              .json({ status: 200, message: 'delete success' });
          }
        },
      );
    }
  }
}
