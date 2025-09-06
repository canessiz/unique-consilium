import { createSlice } from '@reduxjs/toolkit';

export type ThemeType = 'white' | 'g100';
export type SettingsState = {
  theme: ThemeType;
};

const initialState: SettingsState = { theme: 'white' };

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'g100' ? 'white' : 'g100';
    },
    setTheme(state, action: { payload: ThemeType }) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
