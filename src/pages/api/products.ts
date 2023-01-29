/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';
import { Product } from '../../components/manufacturer/_data_';

const fetchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Array<{ name: string }>>
) => {
  const client = await connectToDatabase();

  try {
    const {
      query: { manufacturer },
    } = req;

    const products = (
      await client
        .db()
        .collection<Product>('products')
        .find({ manufacturer })
        .toArray()
    ).map(({ name }) => ({ name }));

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json([]);
  }
  client.close();
};

const addProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Product[] | string>
) => {
  const client = await connectToDatabase();

  try {
    const { manufacturer, name } = req.body;

    await client.db().collection('products').insertOne({
      manufacturer,
      name,
    });

    res.status(201).json('Product added successfully');
  } catch (error) {
    res.status(500).json('Product not added!');
  }
  client.close();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<{ name: string }> | string>
) {
  if (req.method === 'GET') {
    fetchProducts(req, res);
  } else if (req.method === 'POST') {
    addProducts(req, res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
