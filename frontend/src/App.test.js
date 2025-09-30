import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders task management application', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Check if the app renders without crashing
  expect(document.body).toBeInTheDocument();
});

test('navigation renders correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Check if navigation elements are present
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();
});