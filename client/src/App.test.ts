import { render, screen } from '@testing-library/react';
import App from './App'

test('renders learn react link', () => {
  const test = App()
 
    
  
  expect(test).toBeInTheDocument();
});
