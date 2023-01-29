/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';

const getDistributors = async (res: NextApiResponse) => {
  const client = await connectToDatabase();

  try {
    const distributors = (
      await client
        .db()
        .collection('users')
        .find({ role: 'distributor' })
        .toArray()
    ).map(({ name }) => name);

    res.status(201).json(distributors);
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
    getDistributors(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
