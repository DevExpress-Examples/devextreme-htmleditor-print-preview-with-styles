import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should create the component', () => {
    render(<App />);
    expect(screen.getByText(/show markup/i)).toBeInTheDocument();
  });

  it('should render the dx-html-editor', () => {
    render(<App />);
    const editor = document.querySelector('.dx-htmleditor');
    expect(editor).toBeTruthy();
  });

  it('opens the popup and renders an iframe when the preview button is clicked', async () => {
    render(<App />);

    const previewButton = screen.getByText(/show markup/i);
    fireEvent.click(previewButton);

    await waitFor(() => {
      expect(document.querySelector('.dx-popup-content')).toBeTruthy();
    });

    const iframe = document.querySelector('.dx-popup-content iframe');
    expect(iframe).toBeTruthy();
  });
});
