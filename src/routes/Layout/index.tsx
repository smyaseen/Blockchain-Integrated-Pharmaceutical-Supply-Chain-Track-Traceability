import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
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
    paddingTop: 64,
    ...(isLoggedIn && {
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 300,
      },
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
        <CircularProgress
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          size={100}
        />
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
