import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { toPng, toBlob } from 'html-to-image';

const Poster = React.forwardRef((props, ref) => {
  const elementRef = React.useRef();
  const dispatch = useDispatch();
  const datastore = useSelector((state) => state.data);
  const [page, setPage] = React.useState([]);
  React.useEffect(() => {
    setPage(datastore);
    console.log(page, 'page');
  }, [datastore]);

  React.useImperativeHandle(ref, () => ({
    download: () => {
      htmlToImageConvert();
    },
  }));

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        let date_ = new Date();
        link.download = 'poster' + date_ + '.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack
      ref={elementRef}
      className="poster-wrapper"
      flexDirection={'column'}
      sx={{
        maxWidth: '768px',
        padding: '0 16px 16px',
        gap: 2,
        margin: '0',
        backgroundImage:
          'linear-gradient(to bottom,#fff,96px,#fff,97px,#bfeaec, #fffef9) ',
      }}
    >
      {page.map((item) => RenderElements(item))}
    </Stack>
  );
});

export default Poster;

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
        style={{ objectFit: 'cover', width: '768px' }}
        alt={item.obj}
        id={item.id}
        key={item.id}
      />
    );
  }
  if (item.obj === 'gallery') {
    return (
      <Stack
        sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
        flexDirection="row"
      >
        {item.gallery.map((img_, index) => (
          <img
            key={index}
            src={img_}
            style={{
              objectFit: 'cover',
              width: 'clamp(150px,240px,380px)',
              flexGrow: 1,
              maxHeight: '240px',
            }}
            alt={item.obj}
            id={item.id}
          />
        ))}
      </Stack>
    );
  }
  if (item.obj === 'image') {
    return (
      <img
        src={item.path}
        width="100%"
        height="300px"
        style={{ objectFit: 'cover', maxWidth: '768px' }}
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
