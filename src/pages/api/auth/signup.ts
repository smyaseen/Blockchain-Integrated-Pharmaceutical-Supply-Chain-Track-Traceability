// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, address, role } = req.body;

    try {
      const clientDB = await connectToDatabase();

      let existingUser = await clientDB
        .db()
        .collection('users')
        .findOne({ address });

      if (existingUser) {
        res.status(422).json({ message: 'User address already exists!' });
        clientDB.close();
      }

      existingUser = await clientDB.db().collection('users').findOne({ name });

      if (existingUser) {
        res.status(422).json({ message: 'User name already exists!' });
        clientDB.close();
      } else {
        await clientDB.db().collection('users').insertOne({
          name,
          address,
          role,
        });

        res.status(201).json({ message: 'User created!' });
        clientDB.close();
      }
    } catch (err) {
      console.log('🚀 ~ file: signup.ts:45 ~ err:', err);

      res.status(500).json({ message: 'User creation error!' });
    }
  }
}
