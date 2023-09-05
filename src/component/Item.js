import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  minHeight: '28px',
  color: theme.palette.text.secondary,
  display: 'flex',

  gap: 8,
  '& .actions': {
    display: 'none',
  },
  '&:hover>.actions': {
    display: 'inherit',
  },
}));

export default Item;
