import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Container, Row, Col, Pagination, Stack } from 'react-bootstrap';
import { Task } from '../../interfaces/TaskInterface';
import { useTheme } from '../../context/ThemeContext';
import './TaskTable.css';
import TableErrorMessage from '../tableErrorMessage/TableErrorMessage';

interface TableProps {
    filteredTasks: Task[];
    setShow: (arg0: boolean) => void;
    setStart: (arg0: number) => void;
}

export default function TaskTable({ filteredTasks, setShow, setStart } : TableProps) {
  const {theme} = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 12;
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTasks]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (index: number) => {
    setStart(index);
    setShow(true);
  }

  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <>
      <div className="fixed-height-table">
        {filteredTasks.length === 0 ? (
          <Container>
            <Row>
              <Col>
                <TableErrorMessage />
                <Button variant="primary" onClick={() => setShow(true)}>Add Task</Button>
              </Col>
            </Row>
          </Container>
        ) : (
          <>
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
                {currentTasks.map((task, index) => {
                  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                  const formattedDate = dueDate ? `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}` : 'N/A';
                  return (
                    <tr key={index}>
                      <td><Form.Check inline checked={task.completed} /></td>
                      <td className='w-50' style={{textAlign: "left"}}>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <Stack direction="horizontal" gap={3} className="justify-content-center">
                          <Button variant="primary" onClick={() => handleEdit(index)}>Edit</Button>
                          <Button variant="danger">Delete</Button>
                        </Stack>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </div>
      {filteredTasks.length !== 0 ? (
      <Pagination data-bs-theme={theme}>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
         <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
        ) : (<></>)}
    </>
  );
}