import React from 'react';
import { Form } from 'react-bootstrap';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import { useTheme } from '../../context/ThemeContext';
import './SearchBar.css';

interface SearchBarProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  stateFilter: boolean;
  setStateFilter: (value: boolean) => void;
}

export default function SearchBar({ nameFilter, setNameFilter, priorityFilter, setPriorityFilter, stateFilter, setStateFilter }: SearchBarProps) {
  const {theme} = useTheme();

  return (
    <Form className="form" data-bs-theme={theme}>
      <div className="form-controls d-flex">
        <Form.Control
          type="text"
          placeholder="Task Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="mt-2"
        />
        <Form.Control
          as="select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="mt-2 mx-2"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Form.Control>
      </div>
      <div className="form-check-theme-switcher">
        <Form.Check
          type="checkbox"
          label="Show Completed"
          checked={stateFilter}
          onChange={(e) => setStateFilter(e.target.checked)}
          style={{ color: theme === 'dark' ? '#dddddd' : '' }}
        />
        <ThemeSwitcher />
      </div>
    </Form>
  );
}