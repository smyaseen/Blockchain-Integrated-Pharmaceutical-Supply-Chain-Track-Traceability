import React from 'react';
import { Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import QRCode from 'react-qr-code';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';

const BatchProgress = () => (
  <>
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader subheader={`PANADOL 500MG TAB 200'S`} title="Product" />
      <Divider />
      <CardContent>
        <QRCode size={50} value="abc" />
      </CardContent>
      <Divider />
    </Card>
    <br />
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        subheader={new Date(Date.now()).toLocaleString().split(',')[0]}
        title="Produced"
      />
      <Divider />
      <CardContent>
        <QRCode size={50} value="abc" />
        <br />
        <Button variant="contained">View Transaction</Button>
      </CardContent>
      <Divider />
    </Card>
    <br />

    <Card sx={{ maxWidth: 500 }}>
      <Timeline
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Shipped
            <p>{new Date(Date.now()).toLocaleString().split(',')[0]}</p>
            <QRCode size={50} value="abc" />
            <br />
            <Button variant="contained">View Transaction</Button>
          </TimelineContent>{' '}
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Delivered
            <p>{new Date(Date.now()).toLocaleString().split(',')[0]}</p>
            <QRCode size={50} value="abc" />
            <br />
            <Button variant="contained">View Transaction</Button>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Card>
    <br />

    <Card sx={{ maxWidth: 500 }}>
      <Timeline
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Ready To Sell
            <p>{new Date(Date.now()).toLocaleString().split(',')[0]}</p>
            <QRCode size={50} value="abc" />
            <br />
            <Button variant="contained">View Transaction</Button>
          </TimelineContent>{' '}
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Sold
            <p>{new Date(Date.now()).toLocaleString().split(',')[0]}</p>
            <QRCode size={50} value="abc" />
            <br />
            <Button variant="contained">View Transaction</Button>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Card>
  </>
);

export default BatchProgress;
