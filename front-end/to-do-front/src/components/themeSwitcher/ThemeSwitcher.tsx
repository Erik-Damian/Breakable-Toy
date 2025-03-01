// ThemeSwitcher.tsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            checked={theme === 'dark'}
            onChange={toggleTheme}
            style={{ color: theme === 'dark' ? '#dddddd' : '' }}
            data-bs-theme={theme}
        />
    );
};

export default ThemeSwitcher;