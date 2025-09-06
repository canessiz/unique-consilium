import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeSwitcher from '../ThemeSwitcher';

// Helper to render with store (real store since slice is simple)
function renderWithStore() {
  return render(
    <Provider store={store}>
      <ThemeSwitcher />
    </Provider>
  );
}

describe('ThemeSwitcher', () => {
  it('renders after mount with correct initial label/state', async () => {
    renderWithStore();
    const btn = await screen.findByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAttribute('aria-label', 'Switch to dark theme');
  });

  it('toggles theme on click updating aria-pressed and label', async () => {
    renderWithStore();
    const btn = await screen.findByRole('button');
    fireEvent.click(btn);
    await waitFor(() => expect(btn).toHaveAttribute('aria-pressed', 'true'));
    expect(btn).toHaveAttribute('aria-label', 'Switch to light theme');
    fireEvent.click(btn);
    await waitFor(() => expect(btn).toHaveAttribute('aria-pressed', 'false'));
    expect(btn).toHaveAttribute('aria-label', 'Switch to dark theme');
  });
});
