import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

const TrackBatch = ({ setBatchId }: { setBatchId: any }) => {
  const [id, setId] = React.useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
      }}
    >
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          width: 600,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Input Batch Id -> Manufacturer-Medicine-Lot#-DDMMYYYY"
          value={id}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (id) setBatchId(id);
            }
          }}
          onChange={(value) => setId(value.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => id && setBatchId(id)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default TrackBatch;
