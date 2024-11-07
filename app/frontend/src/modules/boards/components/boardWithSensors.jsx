import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../core/assets/styles/variables.scss'; // Import custom SCSS styles
import config from '../../../config/config';  // Import URL paths for APIs
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook for translations
import { FaTemperatureLow, FaTint, FaTachometerAlt, FaArrowsAltH, FaTemperatureHigh, FaExclamationCircle } from 'react-icons/fa';

const BoardsWithSensors = () => {
    const [boards, setBoards] = useState([]);  // State for boards data
    const [loading, setLoading] = useState(true);  // State for loading status
    const [error, setError] = useState(null);  // State for error handling
    const { t } = useTranslation('boardsWithSensors'); // Use the 'boardsWithSensors' namespace for translations

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.frontendBaseUrl}boards/with-sensors`);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                setBoards(data);  // Update boards data
            } catch (error) {
                setError(error.message);  // Set error message
            } finally {
                setLoading(false);  // Stop loading
            }
        };

        fetchData();
    }, []);

    // If the data is loading, show a spinner
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">{t('loading')}</span> {/* Translated loading text */}
                </div>
            </div>
        );
    }

    // If there is an error fetching data, display the error message
    if (error) {
        return <div className="text-center mt-5 text-danger">{t('error')}: {error}</div>; {/* Translated error text */}
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {boards.map((board) => (
                    <div className="col-md-12 mb-4" key={board.board_code}>
                        <div className="card card-board shadow-sm rounded-lg">
                            {/* Header for the board */}
                            <div className="card-header card-header-board p-3">
                                <h5 className="mb-0">{t('boardCode')}: {board.board_code}</h5> {/* Translated board code */}
                            </div>
                            <div className="card-body">
                                {/* If no sensors are available for the board */}
                                {board.Sensors.length === 0 ? (
                                    <p className="text-danger text-center mt-3">{t('noSensors')}</p> 
                                ) : (
                                    <div className="row">
                                        {/* Loop through each sensor */}
                                        {board.Sensors.map((sensor) => (
                                            <div className="col-md-6 col-lg-4 mb-3" key={`${board.board_code}-${sensor.sensor_code}`}>
                                                <div className="card shadow-sm border-0 rounded-lg">
                                                    {/* Header for the sensor */}
                                                    <div className="card-header card-header-sensor text-white p-3">
                                                        <h5 className="mb-3">{t('sensor')}: {sensor.sensor_type}</h5> {/* Translated sensor type */}
                                                    </div>
                                                    <div className="card-body card-body-sensor p-4">
                                                        <div className="d-flex align-items-center mb-3">
                                                            {/* Conditional icons for each sensor type */}
                                                            {sensor.sensor_type === 'Temperature' && <FaTemperatureLow size={50} className="text-warning me-3 card-icon" />}
                                                            {sensor.sensor_type === 'Humidity' && <FaTint size={50} className="text-info me-3 card-icon" />}
                                                            {sensor.sensor_type === 'Pressure' && <FaTachometerAlt size={50} className="text-primary me-3 card-icon" />}
                                                            {sensor.sensor_type === 'Distance' && <FaArrowsAltH size={50} className="text-success me-3 card-icon" />}
                                                            <div>
                                                                {/* Sensor details */}
                                                                <h6 className="card-title-sensor mb-2"><strong>{t('sensorId')}:</strong> {sensor.sensor_code}</h6> {/* Translated sensor ID */}
                                                                <p><strong>{t('unit')}:</strong> {sensor.Unit.unit_abbreviation}</p> {/* Translated unit */}
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="card-min-max-values"><strong><FaTemperatureHigh /> {t('minValue')}:</strong> {sensor.min_value}</p> {/* Translated min value */}
                                                                    <p className="card-min-max-values"><strong><FaExclamationCircle /> {t('maxValue')}:</strong> {sensor.max_value}</p> {/* Translated max value */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardsWithSensors;