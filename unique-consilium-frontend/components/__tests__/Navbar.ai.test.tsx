import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

// Mock Next.js router to satisfy useRouter
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

test('No AI top-level trigger is rendered (per constraints)', () => {
  render(<Navbar />);
  expect(screen.queryByRole('button', { name: /AI \(Ref\)/i })).not.toBeInTheDocument();
});
