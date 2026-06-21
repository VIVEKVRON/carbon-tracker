import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricsGrid } from './MetricsGrid';

describe('MetricsGrid', () => {
  it('renders daily output and weekly delta correctly', () => {
    render(<MetricsGrid dailyOutput={15.5} weeklyDelta={-5} />);
    expect(screen.getByText('Daily Carbon Output')).toBeInTheDocument();
    expect(screen.getByText('15.5')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('renders top contributor', () => {
    render(<MetricsGrid dailyOutput={10} weeklyDelta={2} />);
    expect(screen.getByText('Top Contributor')).toBeInTheDocument();
    expect(screen.getByText('Energy')).toBeInTheDocument();
  });
});
