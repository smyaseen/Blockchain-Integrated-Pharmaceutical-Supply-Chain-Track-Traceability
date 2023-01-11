import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { Product } from '../_data_';

const ProductListResults = ({
  products,
  deleteProduct,
}: {
  products: Product[];
  deleteProduct: (index: number) => void;
}) => (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: '20px',
    }}
  >
    <Table
      sx={{
        backgroundColor: 'white',
        minWidth: 650,
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <TableRow
            hover
            key={product.id}
            sx={{
              borderBottom:
                index !== products.length - 1 ? '1.5px solid #f0f2f5' : 'none',
            }}
          >
            <TableCell>
              <Typography color="textPrimary" variant="body1">
                {product.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textPrimary" variant="body1">
                {product.name}
              </Typography>
            </TableCell>
            <TableCell>
              {/* <Button variant="contained">Create Batch</Button>{' '} */}
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteProduct(index)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductListResults;
