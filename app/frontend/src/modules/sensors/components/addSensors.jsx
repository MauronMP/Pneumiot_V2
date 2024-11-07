import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col, Container, Card } from 'react-bootstrap';
import { FaBox, FaTag, FaRupeeSign, FaChevronDown, FaSpinner } from 'react-icons/fa'; // Icons
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // GUID for sensor code
import config from '../../../config/config';  // API configuration
import { useTranslation } from 'react-i18next'; // Importamos el hook useTranslation para las traducciones

const CreateSensor = () => {
  const { t } = useTranslation('addSensor'); // Inicializamos el hook de traducción

  const [formData, setFormData] = useState({
    sensor_code: uuidv4(), // Generate a GUID for the sensor code
    sensor_type: '',
    unit_id: '',
    min_value: '',
    max_value: ''
  });

  const [units, setUnits] = useState([]); // Units for the dropdown
  const [alert, setAlert] = useState({ message: '', variant: '' }); // Alert messages
  const [loading, setLoading] = useState(false); // Loading state

  // Load units when the component mounts
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`${config.apiV1}units`);
        setUnits(response.data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };
    fetchUnits();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.sensor_type ||
      !formData.unit_id ||
      isNaN(formData.min_value) ||
      isNaN(formData.max_value) ||
      parseFloat(formData.min_value) >= parseFloat(formData.max_value)
    ) {
      setAlert({
        message: t('alertInvalidForm'), // Mensaje de alerta con traducción
        variant: 'danger'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${config.frontendBaseUrl}sensors`, formData);
      setAlert({
        message: t('alertSensorCreated'), // Mensaje de éxito con traducción
        variant: 'success'
      });

      setFormData({
        sensor_code: uuidv4(),
        sensor_type: '',
        unit_id: '',
        min_value: '',
        max_value: ''
      });
    } catch (error) {
      console.error('Error creating sensor:', error);
      setAlert({
        message: t('alertError'), // Mensaje de error con traducción
        variant: 'danger'
      });
    }
    setLoading(false);
  };

  return (
    <Container className="my-5">
      {/* Show alert */}
      {alert.message && <Alert variant={alert.variant} className="text-center">{alert.message}</Alert>}

      {/* Card Container for the Form */}
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <FaBox className="mr-5" size={30} />
            <span className='mx-2'>{t('formTitle')}</span> {/* Título del formulario con traducción */}
          </Card.Title>

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            {/* Sensor GUID */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="sensor_code">
                  <Form.Label><FaBox className="mr-2" size={20} /> {t('sensorCodeLabel')}</Form.Label> {/* Etiqueta para el código del sensor con traducción */}
                  <Form.Control
                    type="text"
                    name="sensor_code"
                    value={formData.sensor_code}
                    readOnly
                    className="form-control-plaintext bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Sensor Name and Units */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="sensor_type">
                  <Form.Label><FaTag className="mr-2" size={20} /> {t('sensorNameLabel')}</Form.Label> {/* Etiqueta para el nombre del sensor con traducción */}
                  <Form.Control
                    type="text"
                    name="sensor_type"
                    value={formData.sensor_type}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                    placeholder={t('sensorNamePlaceholder')} // Placeholder con traducción
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="unit_id">
                  <Form.Label><FaChevronDown className="mr-2" size={20} /> {t('unitLabel')}</Form.Label> {/* Etiqueta para unidad con traducción */}
                  <Form.Control
                    as="select"
                    name="unit_id"
                    value={formData.unit_id}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                  >
                    <option value="">{t('selectUnit')}</option> {/* Opción por defecto con traducción */}
                    {units.map(unit => (
                      <option key={unit.unit_id} value={unit.unit_id}>
                        {unit.unit_abbreviation} - {unit.unit_description}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Minimum and Maximum Values */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="min_value">
                  <Form.Label><FaRupeeSign className="mr-2" size={20} /> {t('minValueLabel')}</Form.Label> {/* Etiqueta para valor mínimo con traducción */}
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="min_value"
                    value={formData.min_value}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                    placeholder={t('minValuePlaceholder')} // Placeholder con traducción
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="max_value">
                  <Form.Label><FaRupeeSign className="mr-2" size={20} /> {t('maxValueLabel')}</Form.Label> {/* Etiqueta para valor máximo con traducción */}
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="max_value"
                    value={formData.max_value}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                    placeholder={t('maxValuePlaceholder')} // Placeholder con traducción
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <Button variant="success" type="submit" disabled={loading} className="w-100 mt-4">
              {loading ? (
                <>
                  <FaSpinner className="spin mr-2" /> {t('creatingSensor')}
                </>
              ) : (
                t('createSensorButton')
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateSensor;