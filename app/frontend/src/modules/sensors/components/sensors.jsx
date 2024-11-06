import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Pagination } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Import URL paths for apis

const Sensors = () => {
  // Define state variables for managing data, loading, search term, pagination, etc.
  const [sensors, setSensors] = useState([]); // Store the list of sensors
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term for filtering sensors
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const [sensorsPerPage] = useState(10); // Number of sensors per page for pagination
  const [showModal, setShowModal] = useState(false); // Manage visibility of the "view more" modal
  const [showEditModal, setShowEditModal] = useState(false); // Manage visibility of the "edit" modal
  const [selectedSensor, setSelectedSensor] = useState(null); // Store the selected sensor for viewing/editing
  const [alert, setAlert] = useState({ message: '', variant: '' }); // Handle success or error alerts
  const [formData, setFormData] = useState({ // Store form data for editing a sensor
    sensor_code: '',
    sensor_type: '',
    unit_id: '',
    min_value: '',
    max_value: ''
  });

  // Fetch the list of sensors from the API when the component mounts
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get(`${config.frontendBaseUrl}sensors`);
        setSensors(response.data); // Set the list of sensors in the state
        setLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.error('Error fetching sensors:', error);
        setLoading(false); // Set loading state to false in case of an error
      }
    };
    fetchSensors(); // Call the function to fetch sensors
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  // Filter sensors based on the search term
  const filteredSensors = sensors.filter(sensor =>
    sensor.sensor_type.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by sensor type
    sensor.sensor_code.toLowerCase().includes(searchTerm.toLowerCase()) // Search by sensor code
  );

  // Calculate the range of sensors to display based on the current page
  const indexOfLastSensor = currentPage * sensorsPerPage;
  const indexOfFirstSensor = indexOfLastSensor - sensorsPerPage;
  const currentSensors = filteredSensors.slice(indexOfFirstSensor, indexOfLastSensor); // Get sensors for the current page

  // Handle pagination, update the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Show the modal with more sensor details
  const handleShowModal = (sensor) => {
    setSelectedSensor(sensor); // Set the selected sensor for viewing
    setShowModal(true); // Open the "view more" modal
  };

  // Close the "view more" modal
  const handleCloseModal = () => setShowModal(false);

  // Show the modal for editing a sensor
  const handleShowEditModal = (sensor) => {
    setSelectedSensor(sensor); // Set the selected sensor for editing
    setFormData({
      sensor_code: sensor.sensor_code,
      sensor_type: sensor.sensor_type,
      unit_id: sensor.unit_id,
      min_value: sensor.min_value,
      max_value: sensor.max_value
    }); // Populate form fields with sensor data
    setShowEditModal(true); // Open the edit modal
  };

  // Close the edit modal
  const handleCloseEditModal = () => setShowEditModal(false);

  // Handle changes in the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData, // Keep the previous form data intact
      [e.target.name]: e.target.value // Update the changed field
    });
  };

  // Handle form submission for editing a sensor
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate form fields
    if (
      !formData.sensor_code ||
      !formData.sensor_type ||
      isNaN(formData.unit_id) ||
      isNaN(formData.min_value) ||
      isNaN(formData.max_value)
    ) {
      setAlert({ message: 'Please fill out all fields correctly.', variant: 'danger' });
      return;
    }

    try {
      // Send the updated sensor data to the server
      await axios.put(`${config.frontendBaseUrl}sensors/${selectedSensor.sensor_id}`, formData);
      setAlert({ message: 'Sensor updated successfully', variant: 'success' }); // Show success message
      setShowEditModal(false); // Close the edit modal

      // Update the list of sensors in the state after successful update
      const updatedSensors = sensors.map(sensor =>
        sensor.sensor_id === selectedSensor.sensor_id ? { ...sensor, ...formData } : sensor
      );
      setSensors(updatedSensors); // Update sensors state with modified data
    } catch (error) {
      console.error('Error updating sensor:', error);
      setAlert({ message: 'Error updating sensor', variant: 'danger' }); // Show error message
    }
  };

  // Create pagination buttons based on the filtered sensors and the sensors per page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSensors.length / sensorsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Show a loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Sensor's list</h1>
      {/* Display alert message if any */}
      {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}

      {/* Search bar for filtering sensors */}
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by sensor code or type"
          value={searchTerm}
          className='mb-3 mt-2'
          onChange={handleSearch} // Trigger search on input change
        />
      </Form.Group>

      {/* Table displaying the list of sensors */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Type</th>
            <th>Unit</th>
            <th>Min Value</th>
            <th>Max Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the sensors for the current page */}
          {currentSensors.map(sensor => (
            <tr key={sensor.sensor_id}>
              <td>{sensor.sensor_id}</td>
              <td>{sensor.sensor_code}</td>
              <td>{sensor.sensor_type}</td>
              <td>{sensor.unit_id}</td>
              <td>{sensor.min_value}</td>
              <td>{sensor.max_value}</td>
              <td>
                {/* Contenedor flex para los botones */}
                <div className="d-flex">
                  {/* Botón "View More" */}
                  <Button
                    variant="info"
                    onClick={() => handleShowModal(sensor)}
                    className="w-100 mx-2" // w-100 asegura que ocupe todo el ancho disponible, mr-2 es para espacio entre botones
                  >
                    View More
                  </Button>

                  {/* Botón "Edit" */}
                  <Button
                    variant="warning"
                    onClick={() => handleShowEditModal(sensor)}
                    className="w-100" // w-100 asegura que ocupe todo el ancho disponible
                  >
                    Edit
                  </Button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination for navigating between pages */}
      <Pagination>
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal for viewing more sensor details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sensor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display sensor details */}
          <p>ID: {selectedSensor?.sensor_id}</p>
          <p>Code: {selectedSensor?.sensor_code}</p>
          <p>Type: {selectedSensor?.sensor_type}</p>
          <p>Unit: {selectedSensor?.unit_id}</p>
          <p>Min Value: {selectedSensor?.min_value}</p>
          <p>Max Value: {selectedSensor?.max_value}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing a sensor */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Sensor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for editing sensor details */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sensor_code">
              <Form.Label>Sensor Code</Form.Label>
              <Form.Control
                type="text"
                name="sensor_code"
                value={formData.sensor_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="sensor_type">
              <Form.Label>Sensor Type</Form.Label>
              <Form.Control
                type="text"
                name="sensor_type"
                value={formData.sensor_type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="unit_id">
              <Form.Label>Unit ID</Form.Label>
              <Form.Control
                type="number"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="min_value">
              <Form.Label>Min Value</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="min_value"
                value={formData.min_value}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="max_value">
              <Form.Label>Max Value</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="max_value"
                value={formData.max_value}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sensors;
