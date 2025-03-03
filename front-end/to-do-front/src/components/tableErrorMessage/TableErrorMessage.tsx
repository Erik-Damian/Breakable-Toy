import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';

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
  

export default function TableErrorMessage() {
    const {theme} = useTheme();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
    }, []);

  return (
    <h2 style={{ color: theme === 'dark' ? '#dddddd' : '' }}>
    {message}. Try another search or add new tasks!
  </h2>
  )
}
