import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock Lottie component to prevent errors during testing
jest.mock('react-lottie', () => () => <div>Mocked Lottie Component</div>);

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
