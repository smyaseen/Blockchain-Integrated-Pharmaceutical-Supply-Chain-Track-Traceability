import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { v4 as uuid } from 'uuid';
import ProductListResults from '../../components/manufacturer/products/ProductListResults';
import ProductListToolbar from '../../components/manufacturer/products/ProductListToolbar';
import products from '../../components/manufacturer/_data_';

const ManufacturerProducts = () => {
  const [listProducts, setListProducts] = useState(products);
  const [addError, setAddError] = useState('');

  const deleteProduct = (index: number) => {
    const temp = [...listProducts];
    temp.splice(index, 1);
    setListProducts(temp);
  };

  const addProduct = (value: string) => {
    if (listProducts.find(({ name }) => name === value)) {
      setAddError('Product already exists');
      return false;
    }
    setListProducts([
      ...listProducts,
      {
        id: uuid(),
        name: value,
      },
    ]);

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
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar addProduct={addProduct} addError={addError} />
          <Box sx={{ mt: 3 }}>
            <ProductListResults
              products={listProducts}
              deleteProduct={deleteProduct}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ManufacturerProducts;
