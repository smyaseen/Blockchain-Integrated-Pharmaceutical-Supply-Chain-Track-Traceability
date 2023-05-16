/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';

const getInitials = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();

  try {
    const products = await client
      .db()
      .collection('products')
      .find({})
      .toArray();

    const transformedArray = products.reduce((acc, obj) => {
      const existingManufacturer = acc.find(
        (item) => item.name === obj.manufacturer
      );
      if (existingManufacturer) {
        existingManufacturer.medicines.push({
          name: obj.name,
          initial: obj.name.substring(0, 3).toUpperCase(),
        });
      } else {
        acc.push({
          name: obj.manufacturer,
          initial: obj.manufacturer.substring(0, 3).toUpperCase(),
          medicines: [
            { name: obj.name, initial: obj.name.substring(0, 3).toUpperCase() },
          ],
        });
      }
      return acc;
    }, []);

    res.status(201).json(transformedArray);
  } catch (error) {
    console.log('🚀 ~ file: browseIntials.ts:39 ~ getInitials ~ error:', error);
    res.status(500).json([]);
  }
  client.close();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    getInitials(req, res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
