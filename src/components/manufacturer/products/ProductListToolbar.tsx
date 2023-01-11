import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
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
  addProduct: (value: string) => boolean;
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
      <Box sx={{ mt: 3, boxShadow: 10 }}>
        {toggleAddButton && (
          <Card>
            <CardContent>
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
                />
                {addError && <p style={{ color: 'red' }}>{addError}</p>}
                <Button
                  sx={{ mt: 1 }}
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    addInput && addProduct(addInput) && setAddInput('')
                  }
                >
                  Add Product
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
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
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
