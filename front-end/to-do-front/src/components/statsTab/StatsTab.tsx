import React from 'react'
import { Button, Form, Table, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function StatsTable() {
  return (
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
  );
}

