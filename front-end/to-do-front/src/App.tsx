import React, { useState } from 'react';
import './App.css';
import ScreenComponent from './SampleScreen';
import { NewTodoForm } from './components/newTodoForm/NewTodoForm';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(false);
  return (
    <div className="App">
      <ScreenComponent setShow={setShow} start={start}/>
      <NewTodoForm show={show} onCancel={() => setShow(false)} setShow={setShow} setStart={setStart} start={start}/>
    </div>
  );
}

export default App;


