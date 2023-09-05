import * as React from 'react';
import Item from './Item';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { moveUp, moveDown, deleteItem } from '../store/slice';

export default function StackItems() {
  const [items, setItems] = React.useState([]);
  const dispatch = useDispatch();
  const datastore = useSelector((state) => state.data);

  React.useEffect(() => {
    setItems(datastore);
    console.log(items, 'stacked 1');
  }, [datastore]);
  return (
    <Stack spacing={1}>
      {items.map((item) => (
        <Item key={item.id} sx={{ alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>{item.obj}</Box>
          <Box className="actions">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => dispatch(moveUp(item.id))}
            >
              <KeyboardArrowUpIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => dispatch(moveDown(item.id))}
            >
              <KeyboardArrowDownIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => dispatch(deleteItem(item.id))}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Item>
      ))}
    </Stack>
  );
}
