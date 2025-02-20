import { useEffect, useState } from 'react'
import '../../App.css'
import { Button, Form, Table, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/actions';
import { AppDispatch, RootState } from '../../store/store';
import bootstrap from 'bootstrap';
import StatsTab from '../../components/statsTab/StatsTab';
import TaskTable from '../../components/taskTable/TaskTable';
import SearchBar from '../../components/searchBar/SearchBar';

function ScreenComponent(props: { setShow: (arg0: boolean) => void; start: boolean }) {
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
          <SearchBar
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TaskTable filteredTasks={filteredTasks} setShow={props.setShow} />
        </Col>
      </Row>
      <StatsTab />
    </Container>
  );
}

export default ScreenComponent;
