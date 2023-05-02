/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open, ...other } = props;

  const {
    data: { name, role },
  } = useSession() as any;

  const { disconnect } = useDisconnect();

  const handleSignOut = async () => {
    onClose?.();
    await signOut();
    disconnect();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{role}</Typography>
        <Typography color="text.secondary" variant="body2">
          {name}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
