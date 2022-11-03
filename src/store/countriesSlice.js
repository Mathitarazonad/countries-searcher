import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllCountries = createAsyncThunk(
  'countries/getAllCountries',
  async () => {
    const data = await fetch('https://restcountries.com/v3.1/all').then(
      (resp) => resp.json()
    );
    return data;
  }
);

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (countries) => {
    const listOfCountries = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countries}`).then(resp => resp.json());
    return listOfCountries;
  }
);

const initialState = {
  countriesToRender: ['ger','usa','bra','isl','afg','ala','alb','012'],
  fetchedCountries: [],
  allCountries: [],
};

const countriesSlice = createSlice({
  name: 'countriesSelection',
  initialState,
  reducers : {
    setCountriesToRender : (state, action) => {
      state.countriesToRender = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.allCountries.push(action.payload);
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.fetchedCountries = action.payload;
    });
  },
});

export default countriesSlice.reducer;
export const {setCountriesToRender} = countriesSlice.actions;
