import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the header and credit', () => {
    render(<App />);
    expect(screen.getByText('THE BEST MEME MAKER')).toBeTruthy();
    expect(screen.getByText('emily baier')).toBeTruthy();
  });
});
