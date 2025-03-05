import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Container, Row, Col, Pagination, Stack,} from 'react-bootstrap';
import { Task } from '../../interfaces/TaskInterface';
import { useTheme } from '../../context/ThemeContext';
import './TaskTable.css';
import TableErrorMessage from '../tableErrorMessage/TableErrorMessage';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../../store/TaskSlice';

interface TableProps {
    filteredTasks: Task[];
    setShow: (arg0: boolean) => void;
    setStart: (arg0: number) => void;
    showToast: (arg0: boolean) => void;
    setToast: (arg0: string) => void;
}

export default function TaskTable({ filteredTasks, setShow, setStart, showToast, setToast } : TableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
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

  const handleToggle = (taskId: number, completed: boolean) => {
    dispatch(toggleTaskStatus(taskId))
      .then(() => {
        console.log('Task status toggled successfully');
        setToast(completed ? '✅ Task completed!' : '✅ Task changed to pending!');
        showToast(true);
      })
      .catch((error: any) => {
        console.error('Error toggling task status:', error);
        setToast('🚫 Failed to toggle the task. Check logs.');
        showToast(true);
      });
  };

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask(taskId))
      .then(() => {

        console.log('Task deleted successfully');
        setToast('✅ Task deleted successfully!');
        showToast(true);
      })
      .catch((error: any) => {
        console.error('Error deleting task:', error);
        setToast('🚫 Failed to delete the task. Check logs.');
        showToast(true);
      });
  };

  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <>
      <div className="fixed-height-table">
        {filteredTasks.length === 0 ? (
          <Container>
            <Row>
              <Col>
                <TableErrorMessage setShow={setShow}/>
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
                      <td><Form.Check inline checked={task.completed}  onChange={() => task.id !== undefined && handleToggle(task.id, !task.completed)}/></td>
                      <td className='w-50' style={{textAlign: "left"}}>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <Stack direction="horizontal" gap={3} className="justify-content-center">
                          <Button variant="primary" onClick={() => handleEdit(index)}>Edit</Button>
                          {confirmDelete === task.id ? (
                          <>
                            <Stack gap={0} className="justify-content-center">
                              <span>Are you sure?</span>
                              <Stack direction="horizontal" gap={1} className="justify-content-center">
                                <Button variant="danger" size="sm" onClick={() => task.id !== undefined && handleDelete(task.id)}>Yes</Button>
                                <Button variant="secondary" size="sm" onClick={() => setConfirmDelete(null)}>No</Button>
                              </Stack>
                            </Stack>
                          </>
                          ) : (
                            <Button variant="danger" onClick={() => task.id !== undefined && setConfirmDelete(task.id)}>Delete</Button>
                          )}
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