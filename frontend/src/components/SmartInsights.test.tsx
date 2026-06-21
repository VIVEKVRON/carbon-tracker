import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SmartInsights } from './SmartInsights';

describe('SmartInsights', () => {
  it('renders insights header', () => {
    render(<SmartInsights insights={[]} />);
    expect(screen.getByText('Personalized Insights')).toBeInTheDocument();
  });

  it('renders insights strings when provided', () => {
    const testInsights = ['Take the bus today.', 'Turn off your AC.'];
    render(<SmartInsights insights={testInsights} />);
    expect(screen.getByText('Take the bus today.')).toBeInTheDocument();
    expect(screen.getByText('Turn off your AC.')).toBeInTheDocument();
  });

  it('renders gathering state when empty', () => {
    render(<SmartInsights insights={[]} />);
    expect(screen.getByText('Gathering insights...')).toBeInTheDocument();
  });
});
