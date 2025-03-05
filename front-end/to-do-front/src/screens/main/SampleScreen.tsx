import { useEffect, useState } from 'react'
import { Container, Row, Col, Toast, ToastContainer, } from 'react-bootstrap';
import StatsTab from '../../components/statsTab/StatsTab';
import TaskTable from '../../components/taskTable/TaskTable';
import SearchBar from '../../components/searchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/TaskSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useTheme } from '../../context/ThemeContext';
import { Task } from '../../interfaces/TaskInterface';


export default function ScreenComponent(props: { setShow: (arg0: boolean) => void; start: number ; setStart: (arg0: number) => void; }) {
  const [nameFilter, setNameFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(Array.isArray(tasks) && !loading ? tasks.filter((task: Task) => {
      const matchesName = task.description.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      const matchesState = stateFilter === true || task.completed === stateFilter;
      return matchesName && matchesPriority && matchesState;
    }) : []);
  }, [tasks, nameFilter, priorityFilter, stateFilter, loading]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error}</p>;
  }

  return (
    <><Container data-bs-theme={theme}>
      <Row className="my-3">
        <Col md={12}>
          <SearchBar
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TaskTable filteredTasks={filteredTasks} setShow={props.setShow} setStart={props.setStart} setToast={setToastMessage} showToast={setShowToast}/>
        </Col>
      </Row>
      <StatsTab />
    </Container>
    <ToastContainer position="bottom-start" className="p-3">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide data-bs-theme={theme.theme}>
        <Toast.Body style={{ color: theme.theme === 'dark' ? '#dddddd' : '' }}>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}
