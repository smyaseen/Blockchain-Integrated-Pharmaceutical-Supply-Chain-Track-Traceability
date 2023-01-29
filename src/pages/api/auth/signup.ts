// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';
import { encryptPassword } from '../../../utility/utils';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;

    try {
      const hashedPassword = await encryptPassword(password);

      const clientDB = await connectToDatabase();

      let existingUser = await clientDB
        .db()
        .collection('users')
        .findOne({ email });

      if (existingUser) {
        res.status(422).json({ message: 'User email already exists!' });
        clientDB.close();
      }

      existingUser = await clientDB.db().collection('users').findOne({ name });

      if (existingUser) {
        res.status(422).json({ message: 'User name already exists!' });
        clientDB.close();
      } else {
        await clientDB.db().collection('users').insertOne({
          name,
          email,
          password: hashedPassword,
          role,
        });

        res.status(201).json({ message: 'User created!' });
        clientDB.close();
      }
    } catch (err) {
      res.status(500).json({ message: 'User creation error!' });
    }
  }
}
