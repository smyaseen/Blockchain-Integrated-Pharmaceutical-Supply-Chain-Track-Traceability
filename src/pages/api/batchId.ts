/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = await connectToDatabase();

    try {
      const {
        query: { manufacturer, medicine },
      } = req;

      const lastBatchId = (
        await client
          .db()
          .collection('batches')
          .findOne({ medicine, manufacturer }, { sort: { _id: -1 } })
      )?.batchId as string;

      res.status(201).json(lastBatchId ? lastBatchId.split('-')[2] : 0);
    } catch (error) {
      res.status(500).json([]);
    }
    client.close();
  }
}
