import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Basic mock for next/navigation router push
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

describe('Navbar dropdown menus', () => {
  it('renders Downloads and Login triggers', () => {
    render(<Navbar />);
  const downloadsLinks = screen.getAllByRole('link', { name: /downloads/i });
  // First link with aria-haspopup is the trigger
  const downloadsTrigger = downloadsLinks.find(el => el.getAttribute('aria-haspopup') === 'menu');
  expect(downloadsTrigger).toBeTruthy();
  const loginLinks = screen.getAllByRole('link', { name: /login/i });
  const loginTrigger = loginLinks.find(el => el.getAttribute('aria-haspopup') === 'menu');
  expect(loginTrigger).toBeTruthy();
  });

  it('opens Login menu and shows all three login options', () => {
    render(<Navbar />);
  const loginTrigger = screen.getAllByRole('link', { name: /login/i }).find(el => el.getAttribute('aria-haspopup') === 'menu')!;
    fireEvent.click(loginTrigger);
    expect(loginTrigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('link', { name: /customer/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /manufacturer/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /field sales rep/i })).toBeInTheDocument();
  });
});
