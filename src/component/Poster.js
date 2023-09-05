import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from '@mui/lab/Masonry';

export default function Poster() {
  const dispatch = useDispatch();
  const datastore = useSelector((state) => state.data);
  const [page, setPage] = React.useState([{ id: 1, obj: 'text', val: 'test' }]);
  React.useEffect(() => {
    setPage(datastore);
    console.log(page, 'page');
  }, [datastore]);
  return (
    <Stack
      className="poster-wrapper"
      flexDirection={'column'}
      sx={{
        maxWidth: '640px',
        background: '#fff',
        padding: 2,
        gap: 2,
        margin: '0 auto',
        backgroundImage:
          'linear-gradient(to bottom,#fff 20%,rgba(0,156,166,0.4)',
      }}
    >
      {page.map((item) => RenderElements(item))}
    </Stack>
  );
}
function RenderElements(item) {
  if (item.obj === 'text') {
    return (
      <Typography id={item.id} key={item.id} variant={item.variant}>
        {item.text}
      </Typography>
    );
  }
  if (item.obj === 'header') {
    return (
      <img
        src={item.path}
        width="100%"
        height="auto"
        style={{ objectFit: 'cover', width: '640px' }}
        alt={item.obj}
        id={item.id}
        key={item.id}
      />
    );
  }
  if (item.obj === 'masonry') {
    return (
      <Box sx={{ width: 500, minHeight: 377 }}>
        <Masonry columns={3} spacing={3}>
          {item.gallery.map((img_, index) => (
            <Item key={index} sx={{ width: '100% ' }}>
              <img
                src={img_}
                width="100%"
                style={{ objectFit: 'cover' }}
                alt={item.obj}
                id={item.id}
              />
            </Item>
          ))}
        </Masonry>
      </Box>
    );
  }
  if (item.obj === 'image') {
    return (
      <img
        src={item.path}
        width="100%"
        height="300px"
        style={{ objectFit: 'cover', maxWidth: '640px' }}
        alt={item.obj}
        id={item.id}
        key={item.id}
      />
    );
  }
  if (item.obj === 'multi type') {
    return (
      <Stack
        key={item.id}
        sx={{
          display: 'flex',
          flexDirection: item.order,
          gap: 2,
        }}
      >
        <Typography
          sx={{ textAlign: 'justify' }}
          id={item.id}
          variant={item.variant}
          sx={{ flexGrow: 1, textAlign: 'left' }}
        >
          {item.text}
        </Typography>
        <img
          src={item.path}
          alt={item.obj}
          id={item.id + '1'}
          style={{ objectFit: 'cover', height: '150px', width: '200px' }}
        />
      </Stack>
    );
  }
}
