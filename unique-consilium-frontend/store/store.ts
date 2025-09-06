import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, { type SettingsState, type ThemeType } from './settingsslice';

// SSR-safe read of theme from localStorage
const THEME_STORAGE_KEY = 'uc:settings:v1:theme';
let preloadedState: { settings: SettingsState } | undefined;
try {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'white' || saved === 'g100') {
      preloadedState = { settings: { theme: saved as ThemeType } };
    }
  }
} catch {
  // ignore storage access errors
}

const devMode = process.env.NODE_ENV !== 'production';

export const store = configureStore({
  reducer: { settings: settingsReducer },
  devTools: devMode,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState,
});

// Persist theme changes to localStorage (browser only)
let prevTheme: ThemeType = store.getState().settings.theme;
store.subscribe(() => {
  const nextTheme = store.getState().settings.theme;
  if (nextTheme !== prevTheme) {
    prevTheme = nextTheme;
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }
    } catch {
      // ignore storage write errors
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
