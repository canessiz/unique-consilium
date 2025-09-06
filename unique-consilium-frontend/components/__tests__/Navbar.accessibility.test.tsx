import { render } from '@testing-library/react';
import Navbar from '@/components/Navbar';

// Mock Next.js router to satisfy useRouter in client component tests
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

test('renders navbar', () => {
	render(<Navbar />);
});
