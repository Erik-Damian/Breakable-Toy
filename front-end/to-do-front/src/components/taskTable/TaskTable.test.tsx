import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskTable from './TaskTable';
import { ThemeProvider } from '../../context/ThemeContext';

const mockStore = configureStore([]);
const initialState = {
  tasks: {
    tasks: [
      { id: 1, description: 'Task 1', priority: 'High', dueDate: new Date('2023-12-31'), completed: false },
      { id: 2, description: 'Task 2', priority: 'Medium', dueDate: new Date('2023-11-30'), completed: true },
    ],
  },
};

jest.mock('../../store/TaskSlice', () => ({
  toggleTaskStatus: jest.fn(),
  deleteTask: jest.fn(),
}));

describe('TaskTable', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <ThemeProvider>
            <TaskTable filteredTasks={initialState.tasks.tasks} setShow={jest.fn()} setStart={jest.fn()} showToast={jest.fn()} setToast={jest.fn()}/>
        </ThemeProvider>
      </Provider>
    );

  test('renders task table with tasks', () => {
    renderComponent();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('shows delete confirmation and cancels deletion', () => {
    renderComponent();
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();

    const noButton = screen.getByText('No');
    fireEvent.click(noButton);
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });
});