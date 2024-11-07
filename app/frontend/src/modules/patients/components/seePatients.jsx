import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Pagination, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../../../config/config';  // Import URL paths for APIs
import { useTranslation } from 'react-i18next'; // Importa el hook useTranslation

const PatientsPage = () => {
    const { t } = useTranslation('patients'); // Usa el espacio de nombres 'patientsPage' para las traducciones

    // Estados para almacenar los datos de los pacientes, pacientes filtrados, y la consulta de búsqueda
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

            // Si no hay datos para el paciente, notificar al usuario
            if (measurements.length === 0) {
                setExportMessage(t('noDataForExport'));
                return;
            }

            // Crear estructura de datos para el CSV con encabezados y filas
            const csvHeader = 'Measurement ID,Patient ID,Board ID,Sensor ID,Sensor Value,Log Time UTC,Log Time Local\n';
            const csvRows = measurements.map(measurement => {
                return `${measurement.measurement_id},${measurement.patient_id},${measurement.board_id},${measurement.sensor_id},${measurement.sensor_value},${measurement.log_time_utc},${measurement.log_time_local}`;
            }).join("\n");

            const csvData = csvHeader + csvRows;

            // Crear archivo CSV descargable
            const blob = new Blob([csvData], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Patient_${patientId}_Measurements.csv`;
            link.click();
        } catch (err) {
            console.error(t('errorExportingData'), err);
        }
    };

    // Función para manejar la alta de un paciente (eliminación del paciente)
    const handleDeletePatient = async () => {
        try {
            if (!patientToDelete) return;

            // Obtener los datos actuales del paciente antes de actualizar
            const response = await axios.get(`${config.frontendBaseUrl}patients/${patientToDelete}`);
            const patientData = response.data;

            // Verificar si el paciente ya tiene una fecha de alta (si ya está dado de alta)
            if (!patientData.discharge_date) {
                // Establecer la fecha de alta como la hora actual si no está configurada
                const updatedPatientData = {
                    ...patientData,
                    discharge_date: new Date().toISOString()  // Formato ISO string
                };

                // Enviar solicitud PUT para actualizar la fecha de alta del paciente
                await axios.put(`${config.frontendBaseUrl}patients/${patientToDelete}`, updatedPatientData);
                
                // Actualizar el estado local para reflejar los cambios
                setPatients(patients.map(patient => 
                    patient.patient_id === patientToDelete ? { ...patient, discharge_date: updatedPatientData.discharge_date } : patient
                ));
                setFilteredPatients(filteredPatients.map(patient => 
                    patient.patient_id === patientToDelete ? { ...patient, discharge_date: updatedPatientData.discharge_date } : patient
                ));
            }

            // Cerrar el modal después de dar de alta al paciente
            setShowModal(false);
        } catch (err) {
            console.error(t('errorDischargingPatient'), err);
        }
    };

    // Función para abrir el modal de confirmación para dar de alta a un paciente
    const openModal = (patientId) => {
        setPatientToDelete(patientId);
        setShowModal(true);
    };

    // Función para cerrar el modal de confirmación
    const closeModal = () => {
        setShowModal(false);
        setPatientToDelete(null);
    };

    useEffect(() => {
        // Obtener la lista de pacientes cuando se monta el componente
        axios.get(`${config.frontendBaseUrl}patients/`)
            .then(response => {
                setPatients(response.data);
                setFilteredPatients(response.data);  // Inicialmente, los pacientes filtrados son los mismos que todos los pacientes
            })
            .catch(err => {
                console.error(t('errorFetchingPatients'), err);
            });
    }, []);

    // Función para formatear la fecha en formato "dd-mm-yyyy"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Función para manejar la búsqueda de pacientes por DNI o fecha (admisión/alta)
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filtrar los pacientes que coincidan con el DNI, la fecha de admisión o la fecha de alta
        const filtered = patients.filter(patient => {
            const dischargeDate = patient.discharge_date ? formatDate(patient.discharge_date) : t('notYet');
            const admissionDate = formatDate(patient.admission_date);

            return patient.patient_dni.toLowerCase().includes(query) ||
                admissionDate.includes(query) ||
                dischargeDate.includes(query);
        });

        setFilteredPatients(filtered);
    };

    // Lógica de paginación - cortar los pacientes filtrados según la página actual
    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // Función para manejar el cambio de página en la paginación
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Lógica de botones de paginación según el número total de pacientes
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPatients.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{t('patientsList')}</h2>

            {/* Mensaje para la exportación de datos */}
            {exportMessage && <Alert variant="info" className="mb-4">{exportMessage}</Alert>}

            {/* Barra de búsqueda */}
            <Form.Control
                type="text"
                placeholder={t('searchByDniOrDate')}
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4"
            />

            {/* Tabla de pacientes */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t('dni')}</th>
                        <th>{t('admissionDate')}</th>
                        <th>{t('dischargeDate')}</th>
                        <th className="text-center">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.map((patient) => (
                        <tr key={patient.patient_id}>
                            <td>{patient.patient_dni}</td>
                            <td>{formatDate(patient.admission_date)}</td>
                            <td>{patient.discharge_date ? formatDate(patient.discharge_date) : t('notYet')}</td>
                            <td className="text-center">
                                <div className="d-flex gap-2">
                                    {/* Botones para ver mediciones, editar paciente, exportar datos y dar de alta al paciente */}
                                    <Button variant="info" className="w-100" onClick={() => handleViewMeasurements(patient.patient_id)}>
                                        {t('viewMeasurements')}
                                    </Button>
                                    <Button variant="primary" className="w-100" onClick={() => handleEditPatient(patient.patient_id)}>
                                        {t('viewRecord')}
                                    </Button>
                                    <Button variant="success" className="w-100" onClick={() => handleExportData(patient.patient_id)}>
                                        {t('exportData')}
                                    </Button>
                                    {!patient.discharge_date && 
                                        <Button variant="danger" className="w-100" onClick={() => openModal(patient.patient_id)}>
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
            <Pagination className="d-flex justify-content-center">
                {pageNumbers.map((number) => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                        {number}
                    </Pagination.Item>
                ))}
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