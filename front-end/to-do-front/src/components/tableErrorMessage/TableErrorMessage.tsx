import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { Button } from 'react-bootstrap';

const messages = [
    "No tasks found",
    "Nothing to see here",
    "Oops, no results",
    "No matches",
    "Empty list",
    "No tasks to show",
    "Nothing but us chickens",
    "Well this is awkward",
    "No tasks, no problems",
    "No tasks here",
    "All done, or is it?",
    "But there was nothing to do",
    "I don't see any tasks",
  ];
  

interface TableErrorMessageProps {
  setShow: (show: boolean) => void;
}

export default function TableErrorMessage({ setShow }: TableErrorMessageProps) {
    const {theme} = useTheme();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
    }, []);

  return (
    <div style={{ height: "600px" }}>
        <h2 style={{ color: theme === 'dark' ? '#dddddd' : '',}}>
          {message}. Try another search or add new tasks!
        </h2>
        <Button variant="primary" onClick={() => setShow(true)}>Add Task</Button>
    </div>
  )
}
