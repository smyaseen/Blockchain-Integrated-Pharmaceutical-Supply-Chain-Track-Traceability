/* eslint-disable no-plusplus */
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

import { Button, Grid } from '@mui/material';
import QRCode from 'react-qr-code';
import {
  timelineConfig,
  timelineNumber,
  walletAddr,
} from '../../../utility/utils';

const getComponent = (batches: any) => {
  const { status } = batches;
  const comp = [];

  for (let i = 0; i <= timelineNumber[status]; i++) {
    const {
      typography,
      icon: { Comp, props },
    } = timelineConfig[i];

    comp.push(
      <TimelineItem key={typography}>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          <Button
            variant="contained"
            fullWidth
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
          >
            View Transaction
          </Button>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color={props?.color || 'inherit'}>
            <Comp fontSize="large" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            {typography}
          </Typography>
          <br />
          <QRCode
            size={50}
            value={`https://sepolia.etherscan.io/tx/${batches.transactions[i]}`}
          />
        </TimelineContent>
      </TimelineItem>
    );
  }

  return comp;
};

const TimeLine = ({ batches }: { batches: any }) => (
  <>
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      {batches && (
        <>
          <Grid item>Manufactured: {batches.quantity}</Grid>
          <Grid item>Sold: {batches.sold}</Grid>
          <Grid item>Remaining: {batches.quantity - batches.sold}</Grid>
        </>
      )}
    </Grid>
    <Timeline
      position="alternate"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      {getComponent(batches)}
    </Timeline>
  </>
);
export default TimeLine;
