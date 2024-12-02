import { useEffect, useState } from 'react'
import './App.css'
import { Button, Form, Table, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './store/actions';
import { AppDispatch, RootState } from './store/store';
import bootstrap from 'bootstrap';

function ScreenComponent(props: { setShow: (arg0: boolean) => void; start:boolean}) {
  const [nameFilter, setNameFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, props.start]);

  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.description.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesState = stateFilter === true || task.completed === stateFilter;
    return matchesName && matchesPriority && matchesState;
  });

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error}</p>;
  }
  return (
    <Container>
      <Row className="my-3">
        <Col md={12}>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Task Name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="mt-2"
            />
            <Form.Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="me-2"
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Select>
            <Form.Check
              type='switch'
              checked={stateFilter}
              onChange={(e) => setStateFilter(!stateFilter)}
              className="me-2"
              label= "Show only completed"
            />
            <Button variant="primary" onClick={() => props.setShow(true)}>+ New To Do</Button>
            <Button variant="secondary" className="ms-2">Search</Button>
          </Form>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md={12}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td><Form.Check inline
                    name="Dua date"
                    checked = {task.completed}
                  /></td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate? task.dueDate + '/' + task.dueDate.getMonth + '/' + task.dueDate.getFullYear : 'NaN'}</td>
                  <td><Button variant="primary" onClick={() => props.setShow(true)}>Edit</Button> <Button variant="danger">Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev />
            <Pagination.Item active>1</Pagination.Item>
            <Pagination.Item>2</Pagination.Item>
            <Pagination.Item>3</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <p><strong>Average time to finish tasks:</strong> 22:15 minutes</p>
        </Col>
        <Col md={6}>
          <p><strong>Average time to finish tasks by priority:</strong></p>
          <ul>
            <li>Low: 10:25 mins</li>
            <li>Medium: 10:25 mins</li>
            <li>High: 10:25 mins</li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default ScreenComponent
