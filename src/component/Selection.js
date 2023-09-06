import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { addItem } from '.././store/slice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';

const Selection = React.forwardRef((props, ref) => {
  const selectRef = React.useRef();
  const dialogRef = React.useRef();
  const dispatch = useDispatch();
  const [inputObject, setinputObject] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    clearSelection: () => {
      if (inputObject !== '') {
        openDialog();
      } else dispatch(addItem({ id: uuidv4(), obj: inputObject }));
    },
  }));

  function openDialog() {
    dialogRef.current.openDialog(inputObject);
  }
  let propVal = Object.values(props);
  const handleChange = (event) => {
    setinputObject(event.target.value);
  };

  return (
    <>
      <FormControl
        sx={{ flexGrow: 1, minWidth: '210px', paddingRight: '8px' }}
        size="small"
        ref={selectRef}
      >
        <InputLabel id="demo-select-small-label">Choose type</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={inputObject}
          label="Choose type"
          onChange={handleChange}
          sx={{ textAlign: 'left' }}
        >
          {propVal[0].data.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CustomDialog ref={dialogRef} />
    </>
  );
});

export default Selection;

const CustomDialog = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [inputObject, setinputObject] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [galleryLinks, setgalleryLinks] = React.useState();
  const [galleryPreview, setGalleryPreview] = React.useState([]);
  const [preview, setPreview] = React.useState();
  const customDialogRef = React.useRef();
  const [text, setText] = React.useState('');
  const [variant, setVariant] = React.useState('h4');
  const [order, setOrder] = React.useState('row');
  React.useImperativeHandle(ref, () => ({
    openDialog: (itype) => {
      setinputObject(itype);
      setOpen(true);
    },
  }));
  const pushItem = () => {
    if (selectedFile && inputObject === 'header') {
      dispatch(addItem({ id: newId(), obj: inputObject, path: preview }));
      setOpen(false);
    }
    if (galleryLinks && inputObject === 'gallery') {
      dispatch(
        addItem({ id: newId(), obj: inputObject, gallery: galleryPreview })
      );
      setOpen(false);
    }
    if (selectedFile && inputObject === 'image') {
      dispatch(addItem({ id: newId(), obj: inputObject, path: preview }));
      setOpen(false);
    }
    if (inputObject === 'text') {
      dispatch(
        addItem({
          id: newId(),
          obj: inputObject,
          text: text,
          variant: variant,
        })
      );
      setOpen(false);
    }
    if (inputObject === 'multi type') {
      dispatch(
        addItem({
          id: newId(),
          obj: inputObject,
          text: text,
          variant: variant,
          path: preview,
          order: order,
        })
      );
      setOpen(false);
    }
    setVariant();
  };
  function newId() {
    return uuidv4();
  }
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!galleryLinks) {
      return;
    }
    let temp = [];
    for (let i = 0; i < galleryLinks.length; i++) {
      let objectUrl = URL.createObjectURL(galleryLinks[i]);
      temp.push(objectUrl);
    }
    setGalleryPreview(temp);

    // free memory when ever this component is unmounted
    return () =>
      galleryPreview.forEach((item) => {
        URL.revokeObjectURL(item);
      });
  }, [galleryLinks]);

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const selectFontVariant = (
    <select
      name="fontSizeSelect"
      id="fontSizeSelect"
      value={variant}
      onChange={(e) => setVariant(e.target.value)}
      defaultValue={variant}
    >
      <option value="h4">Header</option>
      <option value="h6">Subheader</option>
      <option value="body1">paragraph</option>
      <option value="body2">small</option>
    </select>
  );
  const selectOrder = (
    <select
      name="chooseOrder"
      id="chooseOrder"
      value={order}
      onChange={(e) => setOrder(e.target.value)}
      defaultValue={order}
    >
      <option value="row">Text+Image</option>
      <option value="row-reverse">Image+Text</option>
    </select>
  );
  return (
    <Dialog onClose={handleClose} open={open} ref={customDialogRef}>
      <DialogTitle>Upload {inputObject}</DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          justifyContent: 'start',
        }}
      >
        {inputObject === 'header' && (
          <>
            {selectedFile && <img src={preview} height="200" />}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
          </>
        )}
        {inputObject === 'gallery' && (
          <>
            {selectedFile && <img src={preview} height="200" />}
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(e) => {
                console.log(e.target.files, e.target.files.length);
                setgalleryLinks(e.target.files);
              }}
            />
          </>
        )}
        {inputObject === 'image' && (
          <>
            {selectedFile && <img src={preview} height="200" />}
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
          </>
        )}
        {inputObject === 'text' && (
          <>
            {' '}
            {selectFontVariant}
            <input
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />{' '}
          </>
        )}
        {inputObject === 'multi type' && (
          <>
            {' '}
            {selectFontVariant}
            <input
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />{' '}
            {selectedFile && <img src={preview} height="200" />}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />{' '}
            {selectOrder}
          </>
        )}
        <Button variant="contained" onClick={pushItem}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
});
