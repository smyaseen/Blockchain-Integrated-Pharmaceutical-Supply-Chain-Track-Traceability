/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const client = await connectToDatabase();

    try {
      await client
        .db()
        .collection('batches')
        .insertOne({
          ...req.body,
        });

      res.status(201).json('batch added!');
    } catch (error) {
      res.status(500).json('batch not added!');
    }
    client.close();
  }
}
