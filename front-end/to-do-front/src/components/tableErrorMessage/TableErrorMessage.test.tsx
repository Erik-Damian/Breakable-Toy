import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableErrorMessage from './TableErrorMessage';
import { ThemeContext, Theme } from '../../context/ThemeContext';

describe('TableErrorMessage', () => {
  const setShow = jest.fn();

  const toggleTheme = jest.fn();

  const renderComponent = (theme: Theme) =>
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <TableErrorMessage setShow={setShow} />
      </ThemeContext.Provider>
    );

  test('renders a random message', () => {
    renderComponent('light');
    const messageElement = screen.getByText(/Try another search or add new tasks!/);
    expect(messageElement).toBeInTheDocument();
  });

  test('renders with dark theme', () => {
    renderComponent('dark');
    const messageElement = screen.getByText(/Try another search or add new tasks!/);
    expect(messageElement).toHaveStyle('color: #dddddd');
  });

  test('renders with light theme', () => {
    renderComponent('light');
    const messageElement = screen.getByText(/Try another search or add new tasks!/);
    expect(messageElement).not.toHaveStyle('color: #dddddd');
  });

  test('calls setShow when button is clicked', () => {
    renderComponent('light');
    const button = screen.getByText('Add Task');
    fireEvent.click(button);
    expect(setShow).toHaveBeenCalledWith(true);
  });
});