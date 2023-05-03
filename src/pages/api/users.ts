/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();

  try {
    const {
      query: { role },
    } = req;

    const users = (
      await client.db().collection('users').find({ role }).toArray()
    ).map(({ name, address }) => ({
      name,
      address,
    }));

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json([]);
  }
  client.close();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    getUsers(req, res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
