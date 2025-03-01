import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';

export default function StatsTable() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#dddddd' : '';

  return (
    <Row>
      <Col md={6}>
        <p style={{ color: textColor }}><strong>Average time to finish tasks:</strong> 22:15 minutes</p>
      </Col>
      <Col md={6}>
        <p style={{ color: textColor }}><strong>Average time to finish tasks by priority:</strong></p>
        <ul style={{ color: textColor }}>
          <li>Low: 10:25 mins</li>
          <li>Medium: 10:25 mins</li>
          <li>High: 10:25 mins</li>
        </ul>
      </Col>
    </Row>
  );
}

