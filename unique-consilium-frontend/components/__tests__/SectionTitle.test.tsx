import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionTitle from '../SectionTitle';

describe('SectionTitle', () => {
  it('links aria-labelledby to the heading id', () => {
    render(<SectionTitle title="Sample Heading" />);
    const header = screen.getByTestId('section-title');
    const id = header.getAttribute('aria-labelledby');
    expect(id).toBeTruthy();
    const heading = document.getElementById(id!);
    expect(heading).toBeTruthy();
    expect(heading).toHaveTextContent('Sample Heading');
  });

  it('renders actions group with role=group and data-slot instrumentation', () => {
    render(<SectionTitle title="With Actions" actions={<button>Act</button>} />);
    const group = screen.getByRole('group');
    expect(group).toHaveClass('uc-sectiontitle__actions');
    const btn = screen.getByText('Act');
    expect(btn).toHaveAttribute('data-slot', 'action');
  });

  it('applies center modifier class when align="center"', () => {
    render(<SectionTitle title="Centered" align="center" />);
    const header = screen.getByTestId('section-title');
    expect(header).toHaveClass('uc-sectiontitle--center');
  });

  it('autoAnchor generates slug + suffix for string title', () => {
    render(<SectionTitle title="Lead in AI" autoAnchor />);
    const header = screen.getByTestId('section-title');
    const id = header.getAttribute('aria-labelledby');
    expect(id).toMatch(/^lead-in-ai-[A-Za-z0-9]{4}$/);
  });
});
