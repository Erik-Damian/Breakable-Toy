import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StickyAddButton from './StickyAddButton';
import { ThemeContext, Theme } from '../../context/ThemeContext';

describe('StickyAddButton', () => {
  const setShow = jest.fn();

  const toggleTheme = jest.fn();

  const renderComponent =  (theme: Theme) =>
    render(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <StickyAddButton set={setShow} onClick={() => console.log("Whatever")}/>
      </ThemeContext.Provider>
    );

  test('renders the button', () => {
    renderComponent('light');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('calls setShow when button is clicked', () => {
    renderComponent('light');
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setShow).toBeCalledTimes(1);
  });
});