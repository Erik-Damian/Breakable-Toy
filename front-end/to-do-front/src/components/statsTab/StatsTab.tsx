import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './StatsTabsStyles.css';
import { AppDispatch, RootState } from '../../store/store';
import { Col, Row } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { fetchAverageAll, fetchAverageHigh, fetchAverageLow, fetchAverageMedium } from '../../store/TimesSlice';

export default function StatsTab() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks } = useSelector((state: RootState) => state.tasks);
    const { theme } = useTheme();
    const textColor = theme === 'dark' ? '#dddddd' : '';
    const { averageAll, averageLow, averageMedium, averageHigh, loading, error } = useSelector((state: RootState) => state.times);

    useEffect(() => {
        dispatch(fetchAverageAll());
        dispatch(fetchAverageLow());
        dispatch(fetchAverageMedium());
        dispatch(fetchAverageHigh());
    }, [tasks.length, dispatch]);
    
  return (
    <Row>
      <Col md={6}>
        <p style={{ color: textColor }}><strong>Average time to finish tasks:</strong> {averageAll}</p>
      </Col>
      <Col md={6}>
        <p style={{ color: textColor }}><strong>Average time to finish tasks by priority:</strong></p>
        <ul style={{ color: textColor }}>
          <li>Low: {averageLow} mins</li>
          <li>Medium: {averageMedium} mins</li>
          <li>High: {averageHigh} mins</li>
        </ul>
      </Col>
    </Row>
  );
}

