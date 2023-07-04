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
      const {
        query: { manufacturer, medicine },
      } = req;

      const lastBatchId = (
        await client
          .db()
          .collection('batches')
          .findOne(
            {
              medicine,
              manufacturer,
              created: new Date().toLocaleDateString('en-GB'),
            },
            { sort: { _id: -1 } }
          )
      )?.batchId as string;

      res.status(201).json(lastBatchId ? lastBatchId.split('-')[2] : 0);
    } catch (error) {
      res.status(500).json([]);
    }
    client.close();
  } else if (req.method === 'GET') {
    const client = await connectToDatabase();

    try {
      const {
        query: { distributor, pharmacy },
      } = req;

      let batchIds = await client
        .db()
        .collection('batches')
        .find(distributor ? { distributor } : { 'pharmacy.title': pharmacy }, {
          projection: {
            batchId: 1,
            _id: 0,
            ...(distributor
              ? { quantity: 1, sold: 1, tokenId: 1 }
              : { pharmacy: 1, tokenId: 1 }),
            transactions: 1,
          },
        })
        .toArray();

      if (pharmacy) {
        batchIds = batchIds?.map((batch) => {
          const pharmaData = batch.pharmacy.find(
            ({ title }) => title === pharmacy
          );

          const { pharmacy: phar, ...rest } = batch;

          rest.sold = pharmaData.sold;
          rest.quantity = pharmaData.stock;

          return rest;
        });
      }

      res.status(201).json(batchIds?.length ? batchIds : []);
    } catch (error) {
      res.status(500).json([]);
    }

    client.close();
  }
}
