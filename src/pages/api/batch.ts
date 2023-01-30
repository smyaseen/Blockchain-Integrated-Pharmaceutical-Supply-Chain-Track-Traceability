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
  } else if (req.method === 'GET') {
    const client = await connectToDatabase();

    const {
      query: { manufacturer },
    } = req;

    try {
      const batches = await client
        .db()
        .collection('batches')
        .find({ manufacturer }, { projection: { _id: 0 } })
        .toArray();

      res.status(201).json(batches);
    } catch (error) {
      res.status(500).json([]);
    }
    client.close();
  } else if (req.method === 'PUT') {
    const client = await connectToDatabase();
    const {
      body: { batchId, status },
    } = req;

    try {
      await client
        .db()
        .collection('batches')
        .updateOne({ batchId }, { $set: { status } });

      res.status(201).json('changed status successfully!');
    } catch (error) {
      res.status(500).json('change status error!');
    }

    client.close();
  }
}
