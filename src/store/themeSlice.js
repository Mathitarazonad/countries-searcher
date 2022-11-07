import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode : false,
}

const themeSlice = createSlice({
  name: themes,
  initialState,
  reducers : {
    changeTheme : (state) => {
      state.darkMode = !state.darkMode;
    }
  }
})

export default themeSlice.reducer;
export const {
  changeTheme
} = themeSlice.actions
