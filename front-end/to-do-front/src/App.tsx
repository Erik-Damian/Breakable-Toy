import React, { useState } from 'react';
import { NewTodoForm } from './components/newTodoForm/NewTodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ScreenComponent from './screens/main/SampleScreen';
import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(false);
  const {theme} = useTheme();

  const backgroundColor = theme === 'dark' ? '#252525' : '#ffffff';

  return (
    <div className="App" style={{ backgroundColor}}>
      <ScreenComponent setShow={setShow} start={start} />
      <NewTodoForm show={show} onCancel={() => setShow(false)} setShow={setShow} setStart={setStart} start={start} />
    </div>
  );
}

export default App;


