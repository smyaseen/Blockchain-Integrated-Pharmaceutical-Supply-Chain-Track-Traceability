import React from 'react';
import router from 'next/router';

import { Box, Button, ListItem } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavItem = (props: any) => {
  const { href, icon, title, ...others } = props;
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        component="a"
        startIcon={icon}
        disableRipple
        onClick={() => {
          router.push(href);
        }}
        sx={{
          ...(active
            ? {
                backgroundColor: 'rgba(255,255,255, 0.08)',
                fontWeight: 'fontWeightBold',
              }
            : {}),
          borderRadius: 1,
          color: active ? 'secondary.main' : 'neutral.300',
          justifyContent: 'flex-start',
          px: 3,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '& .MuiButton-startIcon': {
            color: active ? 'secondary.main' : 'neutral.400',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255, 0.08)',
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

export default NavItem;
