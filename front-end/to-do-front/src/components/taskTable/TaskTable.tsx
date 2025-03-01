import React from 'react'
import { Button, Form, Table, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../../interfaces/TaskInterface';
import { useTheme } from '../../context/ThemeContext';
import './TaskTable.css';

interface TableProps {
    filteredTasks: Task[];
    setShow: (arg0: boolean) => void;
}

export default function TaskTable({ filteredTasks, setShow } : TableProps) {
  const {theme} = useTheme();
    return (
      <>
      <div className="fixed-height-table">
        <Table striped bordered hover variant={theme}>
          <thead>
            <tr>
              <th>Completed</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredTasks.map((task, index) => {
              const dueDate = task.dueDate ? new Date(task.dueDate) : null;
              const formattedDate = dueDate ? `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}` : 'N/A';
              return (
                <tr key={index}>
                  <td><Form.Check inline checked={task.completed} /></td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>
                    <Button variant="danger" className="ml-2">Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
        <Pagination data-bs-theme={theme}>
          <Pagination.Prev />
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </>
    );
  }