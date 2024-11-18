import React, { useState, useEffect } from 'react';
import { Form, Button, Card, InputGroup, Row, Col, Toast } from 'react-bootstrap'; // Import necessary Bootstrap components
import { FaBox, FaTag, FaRupeeSign, FaChevronDown, FaSpinner } from 'react-icons/fa'; // FontAwesome icons for UI
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // GUID for sensor code
import config from '../../../config/config'; // API configuration
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook for translations

const CreateSensor = () => {
  const { t } = useTranslation('addSensor'); // Use the 'addSensor' namespace for translations

  const [formData, setFormData] = useState({
    sensor_code: uuidv4(), // Generate a GUID for the sensor code
    sensor_type: '',
    unit_id: '',
    min_value: '',
    max_value: ''
  });

  const [units, setUnits] = useState([]); // Units for the dropdown
  const [loading, setLoading] = useState(false); // Loading state
  const [showToast, setShowToast] = useState(false); // State for toast visibility

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
      // Removed setAlert for form invalidation
      setShowToast(true); // You can show an error toast here if necessary
      return;
    }

    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${config.frontendBaseUrl}sensors`, formData);

      // Mostrar el Toast al crear el sensor
      setShowToast(true); // Mostrar el toast de éxito

      // Ocultar el toast después de 4 segundos y limpiar el formulario
      setTimeout(() => {
        setFormData({
          sensor_code: uuidv4(),
          sensor_type: '',
          unit_id: '',
          min_value: '',
          max_value: ''
        });
        setShowToast(false); // Ocultar el toast después de 4 segundos
      }, 4000);

    } catch (error) {
      console.error('Error creating sensor:', error);
      // Show error toast if necessary
      setShowToast(true); // Show error toast here
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '50%' }}>
      <Card className="p-4 shadow-sm" style={{ width: '100%' }}>
        <h2 className="mb-4 text-center">{t('formTitle')}</h2> {/* Título traducido */}

        <Form onSubmit={handleSubmit}>
          {/* Sensor GUID */}
          <Row>
            <Col md={12}>
              <Form.Group controlId="sensor_code" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaBox /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="text"
                    name="sensor_code"
                    value={formData.sensor_code}
                    readOnly
                    className="form-control-plaintext bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Sensor Name and Units */}
          <Row>
            <Col md={12}>
              <Form.Group controlId="sensor_type" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaTag /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="text"
                    name="sensor_type"
                    value={formData.sensor_type}
                    onChange={handleChange}
                    required
                    placeholder={t('sensorNamePlaceholder')} // Placeholder con traducción
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="unit_id" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaChevronDown /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    as="select"
                    name="unit_id"
                    value={formData.unit_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('selectUnit')}</option> {/* Opción por defecto con traducción */}
                    {units.map(unit => (
                      <option key={unit.unit_id} value={unit.unit_id}>
                        {unit.unit_abbreviation} - {unit.unit_description}
                      </option>
                    ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Minimum and Maximum Values */}
          <Row>
            <Col md={12}>
              <Form.Group controlId="min_value" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaRupeeSign /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="min_value"
                    value={formData.min_value}
                    onChange={handleChange}
                    required
                    placeholder={t('minValuePlaceholder')} // Placeholder con traducción
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="max_value" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaRupeeSign /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="max_value"
                    value={formData.max_value}
                    onChange={handleChange}
                    required
                    placeholder={t('maxValuePlaceholder')} // Placeholder con traducción
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit" className="w-25" disabled={loading}>
              {loading ? (
                <>
                  <FaSpinner className="spin mr-2" /> {t('creatingSensor')}
                </>
              ) : (
                t('createSensorButton')
              )}
            </Button>
          </div>
        </Form>
      </Card>

      {/* Toast Message - Positioned at the bottom right of the screen */}
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
          className="position-fixed bottom-0 end-0 m-3 bg-success text-white" // Clases para color verde y texto blanco
        >
          <Toast.Body>{t('alertSensorCreated')}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default CreateSensor;