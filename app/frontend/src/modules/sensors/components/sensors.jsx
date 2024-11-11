import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Pagination, Col, Row } from 'react-bootstrap';
import { FaIdCard, FaBarcode, FaThermometerHalf, FaBalanceScale, FaArrowDown, FaArrowUp } from 'react-icons/fa';

import axios from 'axios';
import config from '../../../config/config';
import { useTranslation } from 'react-i18next';

const Sensors = () => {
  const { t } = useTranslation('sensor');

  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sensorsPerPage] = useState(4);
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

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get(`${config.frontendBaseUrl}sensors`);
        setSensors(response.data);
      } catch (error) {
        console.error('Error fetching sensors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSensors();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredSensors = sensors.filter(sensor =>
    sensor.sensor_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sensor.sensor_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSensor = currentPage * sensorsPerPage;
  const indexOfFirstSensor = indexOfLastSensor - sensorsPerPage;
  const currentSensors = filteredSensors.slice(indexOfFirstSensor, indexOfLastSensor);

  const totalPages = Math.ceil(filteredSensors.length / sensorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageRange = () => {
    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(currentPage + 1, totalPages);

    if (currentPage === 1) end = Math.min(3, totalPages);
    if (currentPage === totalPages) start = Math.max(totalPages - 2, 1);

    return [...Array(totalPages).keys()].map(n => n + 1).filter(page => page >= start && page <= end);
  };

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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${config.frontendBaseUrl}sensors/${selectedSensor.sensor_id}`, formData);
      setAlert({ message: t('updateSuccess'), variant: 'success' });
      setShowEditModal(false);

      const updatedSensors = sensors.map(sensor =>
        sensor.sensor_id === selectedSensor.sensor_id ? { ...sensor, ...formData } : sensor
      );
      setSensors(updatedSensors);

      // Auto-hide alert after 5 seconds
      setTimeout(() => setAlert({ message: '', variant: '' }), 5000);
    } catch (error) {
      setAlert({ message: t('errorUpdating'), variant: 'danger' });

      // Auto-hide alert after 5 seconds
      setTimeout(() => setAlert({ message: '', variant: '' }), 5000);
    }
  };

  if (loading) return <p>{t('loading')}</p>;

  return (
    <div className="container mt-4">
      <h1>{t('sensorListTitle')}</h1>

      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={handleSearch}
          className="mb-3"
        />
      </Form.Group>

      <Table striped bordered hover responsive>
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
              <td style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <Button
                  variant="info"
                  onClick={() => handleShowModal(sensor)}
                  style={{ flex: 1 }}
                >
                  {t('viewMore')}
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleShowEditModal(sensor)}
                  style={{ flex: 1 }}
                >
                  {t('edit')}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        {/* Mostrar primera página y puntos suspensivos si es necesario */}
        {currentPage > 3 && (
          <>
            <Pagination.Item onClick={() => paginate(1)}>1</Pagination.Item>
            <Pagination.Ellipsis />
          </>
        )}

        {/* Rango de páginas cercanas */}
        {getPageRange().map(page => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => paginate(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        {/* Mostrar última página y puntos suspensivos si es necesario */}
        {currentPage < totalPages - 2 && (
          <>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => paginate(totalPages)}>{totalPages}</Pagination.Item>
          </>
        )}

        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* View More Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('sensorDetails')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaIdCard size={20} className="mx-2" /> {t('sensorId')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" value={selectedSensor?.sensor_id || ''} readOnly />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaBarcode size={20} className="mx-2" /> {t('sensorCode')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" value={selectedSensor?.sensor_code || ''} readOnly />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaThermometerHalf size={20} className="mx-2" /> {t('sensorType')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" value={selectedSensor?.sensor_type || ''} readOnly />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaBalanceScale size={20} className="mx-2" /> {t('unitId')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" value={selectedSensor?.unit_id || ''} readOnly />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaArrowDown size={20} className="mx-2" /> {t('minValue')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" value={selectedSensor?.min_value || ''} readOnly />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaArrowUp size={20} className="mx-2" /> {t('maxValue')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" value={selectedSensor?.max_value || ''} readOnly />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Sensor Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('editSensor')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sensor_code" className="mb-4">
              <Form.Label>{t('sensorCode')}</Form.Label>
              <Form.Control
                type="text"
                name="sensor_code"
                value={formData.sensor_code}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="sensor_type" className="mb-4">
              <Form.Label>{t('sensorType')}</Form.Label>
              <Form.Control
                type="text"
                name="sensor_type"
                value={formData.sensor_type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="unit_id" className="mb-4">
              <Form.Label>{t('unitId')}</Form.Label>
              <Form.Control
                type="text"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="min_value" className="mb-4">
              <Form.Label>{t('minValue')}</Form.Label>
              <Form.Control
                type="text"
                name="min_value"
                value={formData.min_value}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="max_value" className="mb-4">
              <Form.Label>{t('maxValue')}</Form.Label>
              <Form.Control
                type="text"
                name="max_value"
                value={formData.max_value}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              {t('save')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sensors;
