import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countriesToRender: [
    'germany',
    'united',
    'brazil',
    'iceland',
    'afghanistan',
    'Åland',
    'albania',
    'algeria',
  ],
};

const countriesSlice = createSlice({
  name: 'countriesSelection',
  initialState,
})

export default countriesSlice.reducer;