import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

describe('Navbar mega menus', () => {
  it('opens Principles mega and shows categories', () => {
    render(<Navbar />);
    const trigger = screen.getByRole('button', { name: /principles/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /principles menu/i })).toBeInTheDocument();
    // One of the categories visible (rendered as a link)
    expect(screen.getByRole('link', { name: 'Perfectionism' })).toBeInTheDocument();
  });
  it('switches between Principles and Services content', () => {
    render(<Navbar />);
    // Open Principles and see a Principles-only item
    fireEvent.click(screen.getByRole('button', { name: /principles/i }));
    expect(screen.getByRole('dialog', { name: /principles menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Perfectionism' })).toBeInTheDocument();

    // Open Services and ensure Services item is present and Principles item is gone
    fireEvent.click(screen.getByRole('button', { name: /services/i }));
    expect(screen.queryByRole('dialog', { name: /principles menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: /services menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Advisory' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Perfectionism' })).not.toBeInTheDocument();
  });
  it('only one mega open at a time', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: /principles/i }));
    fireEvent.click(screen.getByRole('button', { name: /services/i }));
    expect(screen.queryByRole('dialog', { name: /principles menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: /services menu/i })).toBeInTheDocument();
  });
});
