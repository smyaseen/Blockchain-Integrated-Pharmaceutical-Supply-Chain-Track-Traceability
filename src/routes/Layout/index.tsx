import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import { Box } from '@mui/material';
import { useSelector } from '../../store/store';
import { getAuthState } from '../../store/slices/authSlice';
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
        paddingLeft: 280,
      },
    }),
  })
);

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isLoggedIn } = useSelector(getAuthState);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot isLoggedIn={isLoggedIn}>
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
      {isLoggedIn && (
        <>
          <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
          <DashboardSidebar
            onClose={() => setSidebarOpen(false)}
            open={isSidebarOpen}
          />
        </>
      )}
    </>
  );
};

export default Layout;
