import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../../interfaces/TaskInterface';
import { useTheme } from '../../context/ThemeContext';
import { createTask, updateTask } from '../../store/TaskSlice';
import { AppDispatch } from '../../store/store';

interface ModalProps {
    show: boolean;
    onCancel: () => void;
    setShow: (show: boolean) => void;
    setStart: (start: number) => void;
    start: number;
}

export function NewTodoForm({ show, onCancel, setShow, setStart, start }: ModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [validated, setValidated] = useState(false);
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Low');
    const [date, setDate] = useState(new Date().toISOString());
    const [dueDated, setDueDated] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const { theme } = useTheme();
    const tasks = useSelector((state: any) => state.tasks);

    useEffect(() => {
        if (start !== -1 && tasks.tasks[start]) {
            const task = tasks.tasks[start];
            setText(task.description);
            setPriority(task.priority);
            setDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
            setDueDated(!!task.dueDate);
        } else {
            console.log('No task to edit');
            resetForm();
        }
    }, [start,tasks]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidated(true);
        if (event.currentTarget.checkValidity()) {
            const newTask: Task = { description: text, priority: priority };
            if (dueDated) newTask.dueDate = new Date(date);
            if (start === -1) {
                dispatch(createTask(newTask))
                    .then(() => {
                        setToastMessage('✅ Task added successfully!');
                        setShowToast(true);
                        resetForm();
                        setShow(false);
                    })
                    .catch((error: any) => {
                        console.error('Error adding task:', error);
                        setToastMessage('🚫 Failed to add the task.');
                        setShowToast(true);
                    });
            } else {
                const taskId = tasks.tasks[start].id;
                dispatch(updateTask({ id: taskId, task: newTask }))
                    .then(() => {
                        setToastMessage('✅ Task updated successfully!');
                        setShowToast(true);
                        resetForm();
                        setShow(false);
                    })
                    .catch((error: any) => {
                        console.error('Error updating task:', error);
                        setToastMessage('🚫 Failed to update the task.');
                        setShowToast(true);
                    });
            }
        }
    };

    const resetForm = () => {
        setText('');
        setDate(new Date().toISOString());
        setPriority('Low');
    };

    const handleClose = () => setShow(false);

    return (
        <><Modal show={show} onHide={handleClose} centered data-bs-theme={theme}>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: theme === 'dark' ? '#dddddd' : '' }}>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formTaskDescription" className="mb-3">
                        <Form.Label column sm={3} style={{ color: theme === 'dark' ? '#dddddd' : '', textAlign: 'left' }}>Description</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter task description"
                                value={text}
                                onChange={(e) => setText(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a task description.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formTaskPriority" className="mb-3">
                        <Form.Label column sm={3} style={{ color: theme === 'dark' ? '#dddddd' : '', textAlign: 'left' }}>Priority</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formTaskDueDate" className="mb-3">
                        <Form.Label column sm={3} style={{ color: theme === 'dark' ? '#dddddd' : '', textAlign: 'left' }}>Due Date</Form.Label>
                        <Col sm={9} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Form.Check
                                type="checkbox"
                                label="Set due date"
                                style={{ color: theme === 'dark' ? '#dddddd' : '' }}
                                checked={dueDated}
                                onChange={(e) => setDueDated(e.target.checked)} />
                            <Form.Control
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                disabled={!dueDated} />
                        </Col>
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                        <Button variant="primary" type="submit">
                            {start === -1 ? 'Add Task' : 'Update Task'}
                        </Button>
                        <Button onClick={onCancel} variant='secondary'>Cancel</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
        <ToastContainer position="bottom-start" className="p-3" >
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide data-bs-theme={theme}>
                    <Toast.Body style={{ color: theme === 'dark' ? '#dddddd' : ''}}>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
        </>
    );
}