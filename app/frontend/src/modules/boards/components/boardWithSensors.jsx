import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTemperatureLow, FaTint, FaTachometerAlt, FaArrowsAltH, FaTemperatureHigh, FaExclamationCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { InputGroup, Form, Col, Row } from 'react-bootstrap';
import config from '../../../config/config';

const BoardsWithSensors = () => {
    const [boards, setBoards] = useState([]);
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation('boardsWithSensors');

    // Fetch data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.frontendBaseUrl}boards/with-sensors`);
                if (!response.ok) throw new Error('Error fetching data');
                const data = await response.json();
                setBoards(data);
                setFilteredBoards(data);  // Initialize filteredBoards with the full boards data
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to handle search input and filter boards
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter boards by board_code, ensuring it checks properly
        setFilteredBoards(
            boards.filter(board =>
                board.board_code.toLowerCase().includes(query) // Make sure search is case-insensitive
            )
        );
    };

    // Loading state
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">{t('loading')}</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return <div className="text-center mt-5 text-danger">{t('error')}: {error}</div>;
    }

    // Render the component
    return (
        <div className="container mt-5">
            {/* Search Bar */}
            <Row className="mb-4 align-items-center">
                <Col xs={12} md={3}>
                    <h4 className="text-dark">{t('allBoards')}</h4>
                </Col>
                <Col xs={12} md={9}>
                    <InputGroup>
                        <InputGroup.Text>{t('search')}</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder={t('searchByBoardCode')}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
            </Row>

            {/* Board Cards */}
            <div className="row">
                {filteredBoards.length === 0 ? (
                    <div className="col-12 text-center">
                        <p className="text-muted">{t('noBoardsFound')}</p>
                    </div>
                ) : (
                    filteredBoards.map((board) => (
                        <div className="col-12 mb-4" key={board.board_code}>
                            <div className="card shadow-lg border-0 rounded-lg">
                                <div style={{ backgroundColor: '#2D6A4F', color: '#FFFFFF', padding: '10px' }}>
                                    <h5 className="mb-0">{t('boardCode')}: {board.board_code}</h5>
                                </div>
                                <div className="card-body" style={{ backgroundColor: '#F5F5F5' }}>
                                    {board.Sensors.length === 0 ? (
                                        <p className="text-muted text-center">{t('noSensors')}</p>
                                    ) : (
                                        <div className="row">
                                            {board.Sensors.map((sensor) => {
                                                const sensorColor = sensor.sensor_type === 'Temperature' ? '#FFA726'
                                                    : sensor.sensor_type === 'Humidity' ? '#29B6F6'
                                                        : sensor.sensor_type === 'Pressure' ? '#B0BEC5'
                                                            : '#66BB6A';

                                                return (
                                                    <div className="col-md-4 col-lg-3 mb-3" key={`${board.board_code}-${sensor.sensor_code}`}>
                                                        <div className="card shadow-sm border-0 rounded-lg" style={{ backgroundColor: sensorColor }}>
                                                            <div className="card-body text-white">
                                                                {/* Sensor Icon */}
                                                                {sensor.sensor_type === 'Temperature' && <FaTemperatureLow size={24} className="me-2" />}
                                                                {sensor.sensor_type === 'Humidity' && <FaTint size={24} className="me-2" />}
                                                                {sensor.sensor_type === 'Pressure' && <FaTachometerAlt size={24} className="me-2" />}
                                                                {sensor.sensor_type === 'Distance' && <FaArrowsAltH size={24} className="me-2" />}
                                                                {/* Sensor Details */}
                                                                <h6>{t('sensor')}: {sensor.sensor_type}</h6>
                                                                <p>{t('sensorId')}: {sensor.sensor_code}</p>
                                                                <p>{t('unit')}: {sensor.Unit.unit_abbreviation}</p>
                                                                <div className="d-flex justify-content-between">
                                                                    <p><FaTemperatureHigh /> {t('minValue')}: {sensor.min_value}</p>
                                                                    <p><FaExclamationCircle /> {t('maxValue')}: {sensor.max_value}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BoardsWithSensors;
