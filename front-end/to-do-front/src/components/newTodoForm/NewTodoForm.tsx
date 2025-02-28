// NewTodoForm.tsx
import React, { useState } from 'react';
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Task } from '../../interfaces/TaskInterface';
import { createTask } from '../../store/actions';
import { useTheme } from '../../context/ThemeContext';

interface ModalProps {
    show: boolean;
    onCancel: () => void;
    setShow: (show: boolean) => void;
    setStart: (start: boolean) => void;
    start: boolean;
}

export function NewTodoForm({ show, onCancel, setShow, setStart, start }: ModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [validated, setValidated] = useState(false);
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Low');
    const [date, setDate] = useState(new Date().toISOString());
    const [dueDated, setDueDated] = useState(false);
    const { theme } = useTheme();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidated(true);
        if (event.currentTarget.checkValidity()) {
            const newTask: Task = { description: text, priority: priority };
            if (dueDated) newTask.dueDate = new Date(date);
            dispatch(createTask(newTask))
                .then(() => {
                    alert('Task added successfully!');
                    resetForm();
                })
                .catch((error) => {
                    console.error('Error adding task:', error);
                    alert('Failed to add the task.');
                });
        }
    };

    const resetForm = () => {
        setText('');
        setDate(new Date().toISOString());
        setPriority('Low');
        setShow(false);
        setStart(!start);
    };

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered data-bs-theme={theme}>
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
                                onChange={(e) => setText(e.target.value)}
                            />
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
                                onChange={(e) => setDueDated(e.target.checked)}
                            />
                            <Form.Control
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                disabled={!dueDated}
                            />
                        </Col>
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                        <Button variant="primary" type="submit">
                            Add Task
                        </Button>
                        <Button onClick={onCancel} variant='secondary'>Cancel</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}