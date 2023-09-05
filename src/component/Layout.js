import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Selection from './Selection';
import Button from '@mui/material/Button';
import Item from './Item';
import StackItems from './StackItems';
import Stack from '@mui/material/Stack';
import Poster from './Poster';
const inputType = ['header', 'text', 'image', 'gallery', 'multi type'];

function Layout() {
  const inputRef = React.useRef();

  const handleClick = () => {
    inputRef.current.clearSelection();
  };
  return (
    <Box sx={{ flexGrow: 1, height: '98vh' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Poster />
        </Grid>
        <Grid sx={{ width: '360px' }}>
          <Item sx={{ height: '100%' }}>
            <Stack spacing={2} direction="column" sx={{ flexGrow: 1 }}>
              <StackItems />
              <Grid sx={{ flexGrow: 1, padding: '0' }}>
                <Selection props={{ data: inputType }} ref={inputRef} />
                <Button variant="contained" onClick={handleClick}>
                  Add asset
                </Button>
              </Grid>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
