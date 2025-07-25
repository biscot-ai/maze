import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the home screen by default', () => {
    render(<App />);
    expect(screen.getByText('Reprendre')).toBeInTheDocument();
    expect(screen.getByText('Partager ce labyrinthe')).toBeInTheDocument();
  });
});
