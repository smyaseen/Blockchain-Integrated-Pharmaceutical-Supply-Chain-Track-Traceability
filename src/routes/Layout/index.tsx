import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { CopyrightRounded, RocketLaunchOutlined } from '@mui/icons-material';
import DashboardNavbar from '../../components/master-layout/DashboardNavbar';
import DashboardSidebar from '../../components/master-layout/DashboardSidebar';

type DashboardLayoutRootProps = {
  isLoggedIn: boolean;
};

const DashboardLayoutRoot = styled('div')<DashboardLayoutRootProps>(
  ({ theme, isLoggedIn }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    ...(isLoggedIn && {
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 300,
      },
      paddingTop: 90,
    }),
  })
);

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { status } = useSession();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {status === 'loading' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress size={70} />
        </Box>
      ) : (
        <>
          <DashboardLayoutRoot isLoggedIn={status === 'authenticated'}>
            <Box
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {children}
            </Box>
          </DashboardLayoutRoot>
          <Typography align="center">
            <CopyrightRounded /> {new Date().getFullYear()}, made by SMY & HFAK{' '}
            <RocketLaunchOutlined />
          </Typography>
          {status === 'authenticated' && (
            <>
              <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
              <DashboardSidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Layout;
