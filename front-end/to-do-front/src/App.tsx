import React, { useState } from 'react';
import { NewTodoForm } from './components/newTodoForm/NewTodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ScreenComponent from './screens/main/SampleScreen';
import './App.css';
import StickyAddButton from './components/stickyAddButton/StickyAddButton';

function App() {
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(-1);
  const {theme} = useTheme();

  const backgroundColor = theme === 'dark' ? '#252525' : '#ffffff';

  return (
    <div className="App" style={{ backgroundColor}}>
      <ScreenComponent setShow={setShow} start={start} setStart={setStart}/>
      <NewTodoForm show={show} onCancel={() => setShow(false)} setShow={setShow} setStart={setStart} start={start} />
      <StickyAddButton onClick={()=>setShow(true)} set={()=>setStart(-1)}/>
    </div>
  );
}

export default App;


