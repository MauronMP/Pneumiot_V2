import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Pagination, Alert, Modal, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../../../config/config';  // Import URL paths for APIs
import { useTranslation } from 'react-i18next'; // Importa el hook useTranslation

const PatientsPage = () => {
    const { t } = useTranslation('patients'); // Usa el espacio de nombres 'patientsPage' para las traducciones

    const [patients, setPatients] = useState([]);  // Todos los datos de los pacientes
    const [filteredPatients, setFilteredPatients] = useState([]);  // Pacientes filtrados por la consulta de búsqueda
    const [currentPage, setCurrentPage] = useState(1);  // Página actual para la paginación
    const [itemsPerPage] = useState(5);  // Constante para los elementos por página (paginación)
    const [searchQuery, setSearchQuery] = useState('');  // Consulta de búsqueda ingresada por el usuario
    const [exportMessage, setExportMessage] = useState('');  // Estado para el mensaje de exportación para notificar a los usuarios
    const [showModal, setShowModal] = useState(false);  // Visibilidad del modal para confirmación
    const [patientToDelete, setPatientToDelete] = useState(null);  // Paciente que se va a dar de alta
    const navigate = useNavigate();

    // Función para navegar al panel de mediciones de un paciente
    const handleViewMeasurements = (patientId) => {
        navigate(`/patientDashboard/${patientId}`);
    };

    // Función para navegar a la página de edición de los datos de un paciente
    const handleEditPatient = (patientId) => {
        navigate(`/edit-patient/${patientId}`);
    };

    // Función para manejar la exportación de datos de un paciente a CSV
    const handleExportData = async (patientId) => {
        try {
            const response = await axios.get(`${config.frontendBaseUrl}measurements/patient/${patientId}`);
            const measurements = response.data;

            if (measurements.length === 0) {
                setExportMessage(t('noDataForExport'));
                return;
            }

            const csvHeader = 'Measurement ID,Patient ID,Board ID,Sensor ID,Sensor Value,Log Time UTC,Log Time Local\n';
            const csvRows = measurements.map(measurement => {
                return `${measurement.measurement_id},${measurement.patient_id},${measurement.board_id},${measurement.sensor_id},${measurement.sensor_value},${measurement.log_time_utc},${measurement.log_time_local}`;
            }).join("\n");

            const csvData = csvHeader + csvRows;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Patient_${patientId}_Measurements.csv`;
            link.click();
        } catch (err) {
            console.error(t('errorExportingData'), err);
        }
    };

    const handleDeletePatient = async () => {
        try {
            if (!patientToDelete) return;
            const response = await axios.get(`${config.frontendBaseUrl}patients/${patientToDelete}`);
            const patientData = response.data;

            if (!patientData.discharge_date) {
                const updatedPatientData = {
                    ...patientData,
                    discharge_date: new Date().toISOString()  // Formato ISO string
                };

                await axios.put(`${config.frontendBaseUrl}patients/${patientToDelete}`, updatedPatientData);

                setPatients(patients.map(patient =>
                    patient.patient_id === patientToDelete ? { ...patient, discharge_date: updatedPatientData.discharge_date } : patient
                ));
                setFilteredPatients(filteredPatients.map(patient =>
                    patient.patient_id === patientToDelete ? { ...patient, discharge_date: updatedPatientData.discharge_date } : patient
                ));
            }

            setShowModal(false);
        } catch (err) {
            console.error(t('errorDischargingPatient'), err);
        }
    };

    const openModal = (patientId) => {
        setPatientToDelete(patientId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setPatientToDelete(null);
    };

    useEffect(() => {
        axios.get(`${config.frontendBaseUrl}/patientsInfo/complete-info`)
            .then(response => {
                setPatients(response.data);
                setFilteredPatients(response.data);
            })
            .catch(err => {
                console.error(t('errorFetchingPatients'), err);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = patients.filter(patient => {
            const dischargeDate = patient.discharge_date ? formatDate(patient.discharge_date) : t('notYet');
            const admissionDate = formatDate(patient.admission_date);

            // Se realiza la búsqueda por nombre, apellidos, DNI y fechas de admisión y alta
            return (
                patient.patient_name.toLowerCase().includes(query) ||  // Buscar por nombre
                patient.patient_surname.toLowerCase().includes(query) ||  // Buscar por apellidos
                patient.patient_dni.toLowerCase().includes(query) ||  // Buscar por DNI
                admissionDate.includes(query) ||  // Buscar por fecha de admisión
                dischargeDate.includes(query)     // Buscar por fecha de alta
            );
        });

        setFilteredPatients(filtered);
    };

    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const getPageRange = () => {
        let start = Math.max(currentPage - 1, 1);
        let end = Math.min(currentPage + 1, totalPages);

        if (currentPage === 1) {
            end = Math.min(3, totalPages);
        }
        if (currentPage === totalPages) {
            start = Math.max(totalPages - 2, 1);
        }

        return pageNumbers.filter((page) => page >= start && page <= end);
    };

    return (
        <div className="container mt-5">
            <Row className="mb-4 align-items-center">
                {/* Título que ocupa 1/3 del espacio */}
                <Col xs={12} md={3}>
                    <h2 className="text-start">{t('patientsList')}</h2>
                </Col>
    
                {/* Barra de búsqueda que ocupa 2/3 del espacio */}
                <Col xs={12} md={9}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder={t('searchByDniOrDate')}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
            </Row>
    
            {/* Mensaje de exportación */}
            {exportMessage && <Alert variant="info" className="mb-4">{exportMessage}</Alert>}
    
            {/* Tabla de pacientes */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>{t('patientName')}</th>
                        <th>{t('patientSurname')}</th>
                        <th>{t('patientBirthDate')}</th>
                        <th>{t('dni')}</th>
                        <th>{t('admissionDate')}</th>
                        <th>{t('dischargeDate')}</th>
                        <th className="text-center">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.map((patient) => (
                        <tr key={patient.patient_id}>
                            <td>{patient.patient_name}</td>
                            <td>{patient.patient_surname}</td>
                            <td>{patient.date_birth}</td>
                            <td>{patient.patient_dni}</td>
                            <td>{formatDate(patient.admission_date)}</td>
                            <td>{patient.discharge_date ? formatDate(patient.discharge_date) : t('notYet')}</td>
                            <td className="text-center">
                                <div className="btn-group" role="group">
                                    <Button variant="info" onClick={() => handleViewMeasurements(patient.patient_id)} className="btn-sm me-2">
                                        {t('viewMeasurements')}
                                    </Button>
                                    <Button variant="primary" onClick={() => handleEditPatient(patient.patient_id)} className="btn-sm me-2">
                                        {t('viewRecord')}
                                    </Button>
                                    <Button variant="success" onClick={() => handleExportData(patient.patient_id)} className="btn-sm me-2">
                                        {t('exportData')}
                                    </Button>
                                    {!patient.discharge_date && 
                                        <Button variant="danger" onClick={() => openModal(patient.patient_id)} className="btn-sm">
                                            {t('discharge')}
                                        </Button>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    
            {/* Paginación */}
            <Pagination className="d-flex justify-content-center mt-4">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {getPageRange().map((number) => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                        {number}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
    
            {/* Modal para confirmar el alta del paciente */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('confirmDischarge')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('dischargeConfirmation')}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>{t('cancel')}</Button>
                    <Button variant="danger" onClick={handleDeletePatient}>{t('yesDischarge')}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    
    
};

export default PatientsPage;
