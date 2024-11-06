import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Pagination, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../../../config/config';  // Import URL paths for APIs

const PatientsPage = () => {
    // States to store the patient data, filtered patients, and search query
    const [patients, setPatients] = useState([]);  // All patients data
    const [filteredPatients, setFilteredPatients] = useState([]);  // Patients filtered by search query
    const [currentPage, setCurrentPage] = useState(1);  // Current page for pagination
    const [itemsPerPage] = useState(5);  // Set constant for items per page (pagination)
    const [searchQuery, setSearchQuery] = useState('');  // The search query entered by the user
    const [exportMessage, setExportMessage] = useState('');  // State for export message to notify users
    const [showModal, setShowModal] = useState(false);  // Modal visibility for confirmation
    const [patientToDelete, setPatientToDelete] = useState(null);  // Patient to be discharged
    const navigate = useNavigate();

    // Function to navigate to a patient's dashboard (view measurements)
    const handleViewMeasurements = (patientId) => {
        navigate(`/patientDashboard/${patientId}`);
    };

    // Function to navigate to a page for editing a patient's information
    const handleEditPatient = (patientId) => {
        navigate(`/edit-patient/${patientId}`);
    };

    // Function to handle exporting patient data to CSV
    const handleExportData = async (patientId) => {
        try {
            const response = await axios.get(`${config.frontendBaseUrl}measurements/patient/${patientId}`);
            const measurements = response.data;

            // If no data exists for the patient, notify the user
            if (measurements.length === 0) {
                setExportMessage('Currently, the patient has no data.');
                return;
            }

            // Create CSV data structure with headers and rows
            const csvHeader = 'Measurement ID,Patient ID,Board ID,Sensor ID,Sensor Value,Log Time UTC,Log Time Local\n';
            const csvRows = measurements.map(measurement => {
                return `${measurement.measurement_id},${measurement.patient_id},${measurement.board_id},${measurement.sensor_id},${measurement.sensor_value},${measurement.log_time_utc},${measurement.log_time_local}`;
            }).join("\n");

            const csvData = csvHeader + csvRows;

            // Create a downloadable CSV file
            const blob = new Blob([csvData], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Patient_${patientId}_Measurements.csv`;
            link.click();
        } catch (err) {
            console.error('Error exporting data:', err);
        }
    };

    // Function to handle patient discharge (deleting a patient)
    const handleDeletePatient = async () => {
        try {
            if (!patientToDelete) return;

            // Fetch current data for the patient before updating
            const response = await axios.get(`${config.frontendBaseUrl}patients/${patientToDelete}`);
            const patientData = response.data;

            // Check if the patient already has a discharge date (if already discharged)
            if (!patientData.discharge_date) {
                // Set discharge date as current time if not already set
                const updatedPatientData = {
                    ...patientData,
                    discharge_date: new Date().toISOString()  // Format as ISO string
                };

                // Send PUT request to update patient discharge date
                await axios.put(`${config.frontendBaseUrl}patients/${patientToDelete}`, updatedPatientData);
                
                // Update local state to reflect changes
                setPatients(patients.map(patient => 
                    patient.patient_id === patientToDelete ? { ...patient, discharge_date: updatedPatientData.discharge_date } : patient
                ));
                setFilteredPatients(filteredPatients.map(patient => 
                    patient.patient_id === patientToDelete ? { ...patient, discharge_date: updatedPatientData.discharge_date } : patient
                ));
            }

            // Close modal after discharging the patient
            setShowModal(false);
        } catch (err) {
            console.error('Error giving patient discharge:', err);
        }
    };

    // Function to open the confirmation modal for deleting a patient
    const openModal = (patientId) => {
        setPatientToDelete(patientId);
        setShowModal(true);
    };

    // Function to close the confirmation modal
    const closeModal = () => {
        setShowModal(false);
        setPatientToDelete(null);
    };

    useEffect(() => {
        // Fetch the list of patients when the component is mounted
        axios.get(`${config.frontendBaseUrl}patients/`)
            .then(response => {
                setPatients(response.data);
                setFilteredPatients(response.data);  // Initially, filtered patients are the same as all patients
            })
            .catch(err => {
                console.error('Error fetching patients:', err);
            });
    }, []);

    // Function to format date in "dd-mm-yyyy" format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Function to handle searching patients by DNI or date (admission/discharge)
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter patients by matching DNI, admission date, or discharge date
        const filtered = patients.filter(patient => {
            const dischargeDate = patient.discharge_date ? formatDate(patient.discharge_date) : 'Not yet!';
            const admissionDate = formatDate(patient.admission_date);

            return patient.patient_dni.toLowerCase().includes(query) ||
                admissionDate.includes(query) ||
                dischargeDate.includes(query);
        });

        setFilteredPatients(filtered);
    };

    // Pagination logic - slice the filtered patients based on current page
    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // Function to handle page change in pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination buttons rendering logic based on the total number of patients
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPatients.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Patients List</h2>

            {/* Message for exporting data */}
            {exportMessage && <Alert variant="info" className="mb-4">{exportMessage}</Alert>}

            {/* Search Bar */}
            <Form.Control
                type="text"
                placeholder="Search by DNI or date (dd-mm-yyyy)"
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4"
            />

            {/* Patients Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Admission Date</th>
                        <th>Discharge Date</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.map((patient) => (
                        <tr key={patient.patient_id}>
                            <td>{patient.patient_dni}</td>
                            <td>{formatDate(patient.admission_date)}</td>
                            <td>{patient.discharge_date ? formatDate(patient.discharge_date) : 'Not yet!'}</td>
                            <td className="text-center">
                                <div className="d-flex gap-2">
                                    {/* Buttons to view measurements, edit patient, export data, and discharge patient */}
                                    <Button
                                        variant="info"
                                        className="w-100"
                                        onClick={() => handleViewMeasurements(patient.patient_id)}>
                                        View Measurements  
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        className="w-100"
                                        onClick={() => handleEditPatient(patient.patient_id)}>
                                        View Record
                                    </Button>
                                    <Button 
                                        variant="success" 
                                        className="w-100" 
                                        onClick={() => handleExportData(patient.patient_id)}>
                                        Export Data
                                    </Button>
                                    {/* Only show "Discharge" if patient does not have a discharge date */}
                                    {!patient.discharge_date ? 
                                        <Button 
                                            variant="danger" 
                                            className="w-100"
                                            onClick={() => openModal(patient.patient_id)}>
                                            Discharge
                                        </Button> 
                                    : ''}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="d-flex justify-content-center">
                {pageNumbers.map((number) => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Discharge</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to discharge this patient?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeletePatient}>Yes, Discharge</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PatientsPage;
