import React from 'react'
import { Button, Form, Table, Container, Row, Col, Pagination } from 'react-bootstrap';

interface SearchBarProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  stateFilter: boolean;
  setStateFilter: (value: boolean) => void;
}

export default function SearchBar({ nameFilter, setNameFilter, priorityFilter, setPriorityFilter, stateFilter, setStateFilter }: SearchBarProps) {
  return (
    <Form className="d-flex">
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
      <Form.Check
        type="checkbox"
        label="Completed"
        checked={stateFilter}
        onChange={(e) => setStateFilter(e.target.checked)}
        className="mt-2"
      />
    </Form>
  );
}