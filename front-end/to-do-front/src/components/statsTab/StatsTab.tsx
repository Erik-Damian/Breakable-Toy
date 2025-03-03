import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './StatsTabsStyles.css';
import { AppDispatch, RootState } from '../../store/store';
import { Col, ListGroup, Row } from 'react-bootstrap';
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
    

  const formatAverage = (average: number | null) => {
    return isNaN(average as number) ? 'No data' : `${average} mins`;
  };

  return (
    <Row>
      <Col md={6}>
      <p style={{ color: textColor }}><strong>Average time to finish tasks: </strong>{formatAverage(averageAll)}</p>
            </Col>
            <Col md={6}>
                <p style={{ color: textColor }}><strong>Average time to finish tasks by priority:</strong></p>
                <ListGroup>
                    <ListGroup.Item style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: textColor }}>
                        <strong>Low:</strong> {formatAverage(averageLow)}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: textColor }}>
                        <strong>Medium:</strong> {formatAverage(averageMedium)}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: textColor }}>
                        <strong>High:</strong> {formatAverage(averageHigh)}
                    </ListGroup.Item>
                </ListGroup>
      </Col>
    </Row>
  );
}

