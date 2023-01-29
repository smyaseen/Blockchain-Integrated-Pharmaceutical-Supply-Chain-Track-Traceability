import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';

const ProductListToolbar = ({
  addProduct,
  addError,
}: {
  addProduct: (value: string) => Promise<boolean>;
  addError: string;
}) => {
  const [toggleAddButton, setToggleAddButton] = useState(false);
  const [addInput, setAddInput] = useState('');

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setToggleAddButton(!toggleAddButton)}
          >
            Toggle Add Product
          </Button>
        </Box>
      </Box>
      {toggleAddButton && (
        <Box sx={{ maxWidth: 500 }}>
          <TextField
            onChange={(e) => setAddInput(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <Add />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder="Add product"
            variant="outlined"
            value={addInput}
            focused
          />
          {addError && <p style={{ color: 'red' }}>{addError}</p>}
          <Button
            sx={{ mt: 1 }}
            color="primary"
            variant="contained"
            onClick={async () =>
              addInput && (await addProduct(addInput)) && setAddInput('')
            }
          >
            Add Product
          </Button>
        </Box>
      )}
      {/* <Box sx={{ maxWidth: 500, mt: 2 }}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <Search />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search product"
          variant="outlined"
          focused
        />
      </Box> */}
    </Box>
  );
};

export default ProductListToolbar;
