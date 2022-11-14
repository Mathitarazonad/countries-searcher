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
  fetchedCountries: [],
  allCountries: [],
  isCountrySelected: false,
  countrySelected: '',
  regionSelected: 'all',
  isFilterOpen: false,
  searchedCountry: '',
  availablePages : 0,
  currentPage: 0
};

const countriesSlice = createSlice({
  name: 'countriesSelection',
  initialState,
  reducers: {
    setIfCountrySelected: (state) => {
      state.isCountrySelected = !state.isCountrySelected;
    },
    setCountrySelected: (state, action) => {
      state.countrySelected = action.payload;
    },
    setRegionSelected: (state, action) => {
      state.regionSelected = action.payload;
    },
    setSearchedCountry: (state, action) => {
      state.searchedCountry = action.payload;
    },
    setIfFilterOpen: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setCurrentPage: (state, action) => {
      if (action.payload === 'next') {
        if (state.currentPage !== state.availablePages) {
          state.currentPage += 1;
        } else {
          state.currentPage = 0;
        }
      } else if (action.payload === 'previous') {
        if (state.currentPage !== 0) {
          state.currentPage -= 1;
        } else {
          state.currentPage = state.availablePages;
        }
      } else {
        state.currentPage = action.payload;
      }
    },
    setAvailablePages: (state, action) => {
      state.availablePages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.allCountries.push(action.payload.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    ));
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
  setIfCountrySelected,
  setCountrySelected,
  setRegionSelected,
  setSearchedCountry,
  setIfFilterOpen,
  setCurrentPage,
  setAvailablePages,
} = countriesSlice.actions;
