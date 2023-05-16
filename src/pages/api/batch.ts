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
      query: { manufacturer, distributor, pharmacy, batchId },
    } = req;

    try {
      if (batchId) {
        const batch = await client
          .db()
          .collection('batches')
          .findOne({ batchId });

        res.status(201).json(batch);
      } else if (manufacturer || distributor) {
        const batches = await client
          .db()
          .collection('batches')
          .find(
            manufacturer ? { manufacturer } : { distributor: distributor },
            {
              projection: { _id: 0, pharmacy: 0 },
            }
          )
          .toArray();

        res.status(201).json(batches);
      } else {
        const batches = (
          await client
            .db()
            .collection('batches')
            .find(
              { 'pharmacy.title': pharmacy },
              {
                projection: { _id: 0 },
              }
            )
            .toArray()
        ).map((batch) => {
          const pharmaData = batch.pharmacy.find(
            ({ title }) => title === pharmacy
          );

          const { pharmacy: phar, ...rest } = batch;

          rest.stockPharma = pharmaData.stock;
          rest.soldPharma = pharmaData.sold;

          return rest;
        });

        res.status(201).json(batches);
      }
    } catch (error) {
      res.status(500).json([]);
    }
    client.close();
  } else if (req.method === 'PUT') {
    const client = await connectToDatabase();
    const {
      body: { batchId, ...others },
    } = req;

    try {
      await client
        .db()
        .collection('batches')
        .updateOne({ batchId }, { $set: { ...others } });

      res.status(201).json('changed status successfully!');
    } catch (error) {
      res.status(500).json('change status error!');
    }

    client.close();
  }
}
