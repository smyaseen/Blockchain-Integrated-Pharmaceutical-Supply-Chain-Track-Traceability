/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {
  DeliveryDiningRounded,
  FactoryRounded,
  LocalPharmacyRounded,
  LocalShippingRounded,
  ShoppingCartCheckoutRounded,
  WarehouseRounded,
} from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import QRCode from 'react-qr-code';

const TimeLine = ({ batches }: { batches: any }) => {
  // eslint-disable-next-line consistent-return
  const getComponent = () => {
    const { status } = batches;

    if (status === 'Manufactured') {
      return (
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            <Button variant="contained" fullWidth>
              View Transaction
            </Button>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <FactoryRounded fontSize="large" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Manufactured
            </Typography>
            <br />
            {/* <Typography>Because you need strength</Typography> */}
            <QRCode size={50} value="hey" />
          </TimelineContent>
        </TimelineItem>
      );
    } else if (status === 'Shipped To Warehouse') {
      return (
        <>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FactoryRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Manufactured
              </Typography>
              <br />
              {/* <Typography>Because you need strength</Typography> */}
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LocalShippingRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>{' '}
        </>
      );
    } else if (status === 'Reached Warehouse') {
      return (
        <>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FactoryRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Manufactured
              </Typography>
              <br />
              {/* <Typography>Because you need strength</Typography> */}
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LocalShippingRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <WarehouseRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Reached Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
        </>
      );
    } else if (status === 'Reached To Pharmacy(s)') {
      return (
        <>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FactoryRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Manufactured
              </Typography>
              <br />
              {/* <Typography>Because you need strength</Typography> */}
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LocalShippingRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <WarehouseRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Reached Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <DeliveryDiningRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Pharmacy(s)
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
        </>
      );
    } else if (status === 'Reached Pharmacy(s)') {
      return (
        <>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FactoryRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Manufactured
              </Typography>
              <br />
              {/* <Typography>Because you need strength</Typography> */}
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LocalShippingRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <WarehouseRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Reached Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <DeliveryDiningRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Pharmacy(s)
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <LocalPharmacyRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Reached Pharmacy(s)
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
        </>
      );
    } else if (status === 'Sold To Customer(s)') {
      return (
        <>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FactoryRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Manufactured
              </Typography>
              <br />
              {/* <Typography>Because you need strength</Typography> */}
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LocalShippingRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <WarehouseRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Reached Warehouse
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <DeliveryDiningRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Shipped To Pharmacy(s)
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transaction
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <LocalPharmacyRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Reached Pharmacy(s)
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              <Button variant="contained" fullWidth>
                View Transactions
              </Button>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <ShoppingCartCheckoutRounded fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Sold To Customer(s)
              </Typography>
              <br />
              <QRCode size={50} value="hey" />
            </TimelineContent>
          </TimelineItem>
        </>
      );
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid item>Manufactured: {batches.quantity}</Grid>
        <Grid item>Sold: {batches.sold}</Grid>
        <Grid item>Remaining: {batches.quantity - batches.sold}</Grid>
      </Grid>
      <Timeline
        position="alternate"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {getComponent()}
      </Timeline>
    </>
  );
};

export default TimeLine;
