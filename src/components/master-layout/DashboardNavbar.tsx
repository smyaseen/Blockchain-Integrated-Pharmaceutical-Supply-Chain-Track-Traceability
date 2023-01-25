import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import AccountPopover from './AccountPopover';

const DashboardNavbarRoot = styled(AppBar)(() => ({
  backdropFilter: 'saturate(200%) blur(1.875rem)',
  backgroundColor: 'rgba(240, 242, 245, 0.8)',
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardNavbar = (props: any) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 300,
          },
          width: {
            lg: 'calc(100% - 340px)',
          },
          margin: '1%',
          borderRadius: '0.75rem',
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1,
              backgroundColor: '#1f293e',
            }}
          >
            <AccountCircle fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

export default DashboardNavbar;
