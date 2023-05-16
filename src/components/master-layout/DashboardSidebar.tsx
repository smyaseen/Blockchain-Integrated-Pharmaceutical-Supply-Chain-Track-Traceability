/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import {
  AddBox,
  Book,
  LocalPharmacy,
  LocalShipping,
  ShoppingBag,
  Timeline,
  Widgets,
} from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import NavItem from './NavItem';
import RouteNames from '../../routes/RouteNames';
import Roles from '../../utility/roles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardSidebar = (props: any) => {
  const {
    data: { role },
  } = useSession() as any;
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  const tabs = {
    [Roles.manufacturer]: [
      {
        href: RouteNames.products,
        icon: <ShoppingBag fontSize="small" />,
        title: 'Products',
      },
      {
        href: RouteNames.manufacturerBatches,
        icon: <Widgets fontSize="small" />,
        title: 'Batches',
      },
      {
        href: RouteNames.manufacturerCreateBatch,
        icon: <AddBox fontSize="small" />,
        title: 'Create Batch',
      },
    ],
    [Roles.distributor]: [
      // {
      //   href: RouteNames.distributorOrders,
      //   icon: <LocalShipping fontSize="small" />,
      //   title: 'Orders',
      // },
      {
        href: RouteNames.distributorBatches,
        icon: <Widgets fontSize="small" />,
        title: 'Batches',
      },
      {
        href: RouteNames.distributorCreateOrder,
        icon: <AddBox fontSize="small" />,
        title: 'Create Order',
      },
    ],
    [Roles.pharmacy]: [
      {
        href: RouteNames.pharmacyOrders,
        icon: <Widgets fontSize="small" />,
        title: 'Orders',
      },
      {
        href: RouteNames.pharmacyCreateOrder,
        icon: <AddBox fontSize="small" />,
        title: 'Create Order',
      },
    ],
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <LocalPharmacy
            sx={{
              height: 42,
              width: 42,
            }}
          />
        </Box>
      </div>
      <Divider
        sx={{
          borderColor: '#2D3748',
          my: 3,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {tabs[role].map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
        <NavItem
          key="Track Batch"
          icon={<Timeline fontSize="small" />}
          href="/"
          title="Track Batch"
        />
        <NavItem
          key="Browse Dictionary"
          icon={<Book fontSize="small" />}
          href={RouteNames.browseDictionary}
          title="Browse Dictionary"
        />
      </Box>
      <Divider sx={{ borderColor: '#2D3748' }} />
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#1f293e',
            color: '#FFFFFF',
            width: 280,
            height: '97vh',
            margin: '0.75rem',
            borderRadius: '10px',
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#1f293e',
          color: '#FFFFFF',
          width: 280,
          height: '97vh',
          margin: '0.75rem',
          borderRadius: '10px',
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
