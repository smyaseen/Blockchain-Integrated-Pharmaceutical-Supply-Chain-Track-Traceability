/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Head from 'next/head';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import ProductListResults from '../../components/manufacturer/products/ProductListResults';
import ProductListToolbar from '../../components/manufacturer/products/ProductListToolbar';
import { fetchProducts } from '../../utility/utils';

const ManufacturerProducts = () => {
  const [addError, setAddError] = useState('');
  const { data } = useSession() as any;

  const {
    isLoading,
    data: products,
    refetch,
  } = useQuery('products', () => fetchProducts(data.name));

  const addProduct = async (value: string) => {
    if (products?.find(({ name }) => name === value)) {
      setAddError('Product already exists');
      return false;
    }

    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({ manufacturer: data.name, name: value }),
      headers: { 'Content-Type': 'application/json' },
    });

    setAddError('');
    refetch();
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

          {isLoading ? (
            <CircularProgress />
          ) : !products?.length ? (
            <Typography sx={{ m: 1 }} variant="h4">
              No Products Available!
            </Typography>
          ) : (
            <Box sx={{ mt: 3, boxShadow: 10, borderRadius: '20px' }}>
              <ProductListResults
                products={products}
                // deleteProduct={()deleteProduct}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ManufacturerProducts;
