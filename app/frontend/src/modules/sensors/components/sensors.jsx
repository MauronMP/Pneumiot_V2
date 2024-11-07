import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Pagination } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Import URL paths for APIs
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Sensors = () => {
  // Hook to manage translations
  const { t } = useTranslation('sensor'); // Using 'sensors' namespace for translations
  
  // State variables
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sensorsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const [formData, setFormData] = useState({
    sensor_code: '',
    sensor_type: '',
    unit_id: '',
    min_value: '',
    max_value: ''
  });

  // Fetch sensors on component mount
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get(`${config.frontendBaseUrl}sensors`);
        setSensors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sensors:', error);
        setLoading(false);
      }
    };
    fetchSensors();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter sensors based on search term
  const filteredSensors = sensors.filter(sensor =>
    sensor.sensor_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sensor.sensor_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSensor = currentPage * sensorsPerPage;
  const indexOfFirstSensor = indexOfLastSensor - sensorsPerPage;
  const currentSensors = filteredSensors.slice(indexOfFirstSensor, indexOfLastSensor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal logic
  const handleShowModal = (sensor) => {
    setSelectedSensor(sensor);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (sensor) => {
    setSelectedSensor(sensor);
    setFormData({
      sensor_code: sensor.sensor_code,
      sensor_type: sensor.sensor_type,
      unit_id: sensor.unit_id,
      min_value: sensor.min_value,
      max_value: sensor.max_value
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.sensor_code ||
      !formData.sensor_type ||
      isNaN(formData.unit_id) ||
      isNaN(formData.min_value) ||
      isNaN(formData.max_value)
    ) {
      setAlert({ message: t('fillAllFields'), variant: 'danger' });
      return;
    }

    try {
      await axios.put(`${config.frontendBaseUrl}sensors/${selectedSensor.sensor_id}`, formData);
      setAlert({ message: t('updateSuccess'), variant: 'success' });
      setShowEditModal(false);

      const updatedSensors = sensors.map(sensor =>
        sensor.sensor_id === selectedSensor.sensor_id ? { ...sensor, ...formData } : sensor
      );
      setSensors(updatedSensors);
    } catch (error) {
      setAlert({ message: t('errorUpdating'), variant: 'danger' });
    }
  };

  // Pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSensors.length / sensorsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <p>{t('loading')}</p>;
  }

  return (
    <div className="container">
      <h1>{t('sensorListTitle')}</h1>

      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          className="mb-3 mt-2"
          onChange={handleSearch}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t('code')}</th>
            <th>{t('type')}</th>
            <th>{t('unit')}</th>
            <th>{t('minValue')}</th>
            <th>{t('maxValue')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentSensors.map(sensor => (
            <tr key={sensor.sensor_id}>
              <td>{sensor.sensor_id}</td>
              <td>{sensor.sensor_code}</td>
              <td>{sensor.sensor_type}</td>
              <td>{sensor.unit_id}</td>
              <td>{sensor.min_value}</td>
              <td>{sensor.max_value}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleShowModal(sensor)}
                  className="w-100 mx-2"
                >
                  {t('viewMore')}
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleShowEditModal(sensor)}
                  className="w-100"
                >
                  {t('edit')}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* View More Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('sensorDetails')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('id')}: {selectedSensor?.sensor_id}</p>
          <p>{t('code')}: {selectedSensor?.sensor_code}</p>
          <p>{t('type')}: {selectedSensor?.sensor_type}</p>
          <p>{t('unit')}: {selectedSensor?.unit_id}</p>
          <p>{t('minValue')}: {selectedSensor?.min_value}</p>
          <p>{t('maxValue')}: {selectedSensor?.max_value}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Sensor Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('editSensor')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sensorCode" className="mb-3">
              <Form.Label>{t('sensorCode')}</Form.Label>
              <Form.Control
                type="text"
                name="sensor_code"
                value={formData.sensor_code}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="sensorType" className="mb-3">
              <Form.Label>{t('sensorType')}</Form.Label>
              <Form.Control
                type="text"
                name="sensor_type"
                value={formData.sensor_type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="unitId" className="mb-3">
              <Form.Label>{t('unitId')}</Form.Label>
              <Form.Control
                type="number"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="minValue" className="mb-3">
              <Form.Label>{t('minValueLabel')}</Form.Label>
              <Form.Control
                type="number"
                name="min_value"
                value={formData.min_value}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="maxValue" className="mb-3">
              <Form.Label>{t('maxValueLabel')}</Form.Label>
              <Form.Control
                type="number"
                name="max_value"
                value={formData.max_value}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {t('saveChanges')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sensors;
