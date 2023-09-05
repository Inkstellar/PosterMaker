import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const addItem = createAction('addItem');
export const moveUp = createAction('moveUp');
export const moveDown = createAction('moveDown');
export const deleteItem = createAction('deleteItem');

const dataSlice = createSlice({
  name: 'storeData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem, (state, action) => {
        state.data = [...state.data, action.payload];
      })
      .addCase(moveUp, (state, action) => {
        let index = state.data.findIndex((item) => item.id === action.payload);
        state.data.splice(index - 1, 0, state.data.splice(index, 1)[0]);
      })
      .addCase(moveDown, (state, action) => {
        let index = state.data.findIndex((item) => item.id === action.payload);
        state.data.splice(index + 1, 0, state.data.splice(index, 1)[0]);
      })
      .addCase(deleteItem, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

// Export the reducer for setting up the store
export default dataSlice.reducer;
