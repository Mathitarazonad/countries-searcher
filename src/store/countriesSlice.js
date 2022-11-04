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
    const listOfCountries = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${countries}`
    ).then((resp) => resp.json());
    return listOfCountries;
  }
);

const initialState = {
  countriesToRender: ['ger', 'usa', 'bra', 'chi', 'rus', 'par', 'arg', 'esp'],
  fetchedCountries: [],
  allCountries: [],
  isCountrySelected: false,
  countrySelected: '',
};

const countriesSlice = createSlice({
  name: 'countriesSelection',
  initialState,
  reducers: {
    setCountriesToRender: (state, action) => {
      state.countriesToRender = action.payload;
    },
    setIfCountrySelected: (state) => {
      state.isCountrySelected = !state.isCountrySelected;
    },
    setCountrySelected: (state, action) => {
      state.countrySelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.allCountries.push(action.payload);
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.fetchedCountries = action.payload.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    });
  },
});

export default countriesSlice.reducer;
export const {
  setCountriesToRender,
  setIfCountrySelected,
  setCountrySelected,
} = countriesSlice.actions;
