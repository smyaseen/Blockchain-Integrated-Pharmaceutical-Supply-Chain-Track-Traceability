/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import ProductListResults from '../../components/manufacturer/products/ProductListResults';
import ProductListToolbar from '../../components/manufacturer/products/ProductListToolbar';
import { Product } from '../../components/manufacturer/_data_';
import { fetchProducts } from '../../utility/utils';

const ManufacturerProducts = () => {
  const [products, setListProducts] = useState<Product[]>([]);
  const [addError, setAddError] = useState('');
  const { data } = useSession() as any;

  useEffect(() => {
    (async () => {
      if (data.name) setListProducts(await fetchProducts(data.name));
    })();
  }, []);

  const deleteProduct = (index: number) => {
    const temp = [...products];
    temp.splice(index, 1);
    setListProducts(temp);
  };

  const addProduct = async (value: string) => {
    if (products.find(({ name }) => name === value)) {
      setAddError('Product already exists');
      return false;
    }

    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({ manufacturer: data.name, name: value }),
      headers: { 'Content-Type': 'application/json' },
    });

    setListProducts([...products, { name: value }]);

    setAddError('');
    return true;
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          pb: 1,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar addProduct={addProduct} addError={addError} />

          {!products?.length ? (
            <Typography sx={{ m: 1 }} variant="h4">
              No Products Available!
            </Typography>
          ) : (
            <Box sx={{ mt: 3, boxShadow: 10, borderRadius: '20px' }}>
              <ProductListResults
                products={products}
                deleteProduct={deleteProduct}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ManufacturerProducts;
