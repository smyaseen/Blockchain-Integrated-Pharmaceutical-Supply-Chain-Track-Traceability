/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      body: { batchId, quantity, pharmacy, hash },
      query: { role },
    } = req;
    console.log(
      '🚀 ~ file: order.ts:13 ~  batchId, quantity, pharmacy',
      batchId,
      quantity,
      pharmacy
    );

    const client = await connectToDatabase();

    try {
      if (role === 'pharmacy') {
        await client
          .db()
          .collection('batches')
          .updateOne(
            { batchId, 'pharmacy.title': pharmacy },
            {
              $inc: {
                'pharmacy.$.sold': parseInt(quantity, 10),
              },
              $set: {
                status: 'Sold To Customer(s)',
              },
              $push: {
                'pharmacy.$.transactions': { amount: quantity, hash },
              },
            }
          );

        res.status(201).json('stock added!');
      } else {
        const isExist = await client
          .db()
          .collection('batches')
          .find({ batchId, 'pharmacy.title': pharmacy })
          .toArray();

        if (!isExist.length) {
          await client
            .db()
            .collection('batches')
            .updateOne(
              { batchId },
              {
                $push: {
                  pharmacy: {
                    title: pharmacy,
                    stock: parseInt(quantity, 10),
                    sold: 0,
                    transactions: [],
                  },
                },
                $inc: { sold: parseInt(quantity, 10) },
                $set: { status: 'Shipped to Pharmacy(s)' },
              }
            );
        } else {
          await client
            .db()
            .collection('batches')
            .updateOne(
              { batchId, 'pharmacy.title': pharmacy },
              {
                $inc: {
                  'pharmacy.$.stock': parseInt(quantity, 10),
                  sold: parseInt(quantity, 10),
                },
              }
            );
        }

        res.status(201).json('stock added!');
      }
    } catch (error) {
      console.log('🚀 ~ file: order.ts:54 ~ error', error.message);
      res.status(500).json('stock not added!');
    }
    client.close();
  }
}
